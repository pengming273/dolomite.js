import fetchMock from 'fetch-mock';
import omit from 'object.omit';
import Pageable from './Pageable';
import nativeFetch from 'node-fetch';
import WSManager from './websockets/WSManager';

const getNativeFetch = () => {
  if (window && window.fetch) 
    return window.fetch.bind(window);
  return nativeFetch;
};

export class ServiceError extends Error {
  constructor({ category, code, description, invalid_fields, request_id }) {
    super(`${category}/${code} : ${description}`);

    this.category = category;
    this.code = code;
    this.description = description;
    this.invalidFields = invalid_fields;
    this.requestId = request_id;
  }
}

export class GenericError extends ServiceError {
  constructor() {
    super({
      category: 'GENERIC_ERROR',
      code: 'SOMETHING_WENT_WRONG',
      description: 'Something went wrong',
      invalid_fields: [],
      request_id: -1
    });
  }
}

/*
 * Super class for all services that provides request
 * mocking, api key handling, fetch requests with helper
 * functions (get, post, etc.) and routing
 */
export default class Service {
  constructor(url, routes = {}, mocks = {}, wsMocks = {}) {
    this.url = url;
    this.apiKey = null;

    this.routes = routes;
    this.mocks = mocks;
    this.wsMocks = wsMocks;

    WSManager.registerMocks(wsMocks);
    this.configureOptions();
  }

  /*
   * Configure the service with an API key. Will remove
   * mock requests and the API key will be added to the
   * header of every request
   */
  configure(apiKey) {
    this.apiKey = apiKey;
    this.fetch = getNativeFetch();
    this.isMocking = false;
  }

  /*
   * Configure the options for the service
   */
  configureOptions(options = {}) {
    this.mockDelay = options.mockDelay || 0;
    this.shouldMock = options.shouldMock === undefined ? true : options.shouldMock;
    this.isMocking = this.shouldMock;

    if (this.shouldMock) {
      this.mockRoutes();
    } else {
      this.fetch = getNativeFetch();
    }
  }

  /*
   * Construct a PageableRequest object without having to import Pageable
   *
   * Usage:
   * return this.pageable('route')
   *   .build((data, globals) => Resource.hydrate(data, globals))
   *   .get(params, {
   *     // custom params
   *   });
   */
  pageable(resource, headers = {}) {
    return Pageable.request((params) => this.get(resource, params, headers))
  }

  /*
   * Subscribe to a websocket route with a callback and build function
   *
   * Usage: 
   * on(<route>, <action>)
   *   .build(rawData => new Obj(data))
   *   .then(<callbackFunc>);
   */
  on(route, action) {
    return {
      build: (buildCallback) => ({
        then: (callback) => {
          WSManager.subscribe(route, action, (data) => {
            callback(buildCallback(data));
          });
        }
      }),
      then: (callback) => {
        WSManager.subscribe(route, action, (data) => {
          callback(data);
        });
      }
    };
  }

  /*
   * Send data to a websocket route with an action and params
   *
   * Usage:
   * return this.send(<route>, <action>, <params>);
   */
  send(route, action, params) {
    return WSManager.send(route, action, params);
  }

  /*
   * GET request
   *
   * resource: the name of the resource in the routes object
   * params: object representation of parameters. `:params` will
   *         be replaced with the matching `param` in the params
   * headers: additional headers to add to the request
   */
  get(resource, params = {}, headers = {}) {
    return this.requestRoute('get', resource, { hydrate_all: true, ...params}, headers);
  }

  /*
   * POST Request
   */
  post(resource, params = {}, headers = {}) {
    console.log('\n\n\n\nPOST>>>>>>>>')
    console.log(JSON.stringify(params));
    console.log('>>>>>>>>>>>>>>>>>>>');
    return this.requestRoute('post', resource, params, headers);
  }

  /*
   * PUT Request
   */
  put(resource, params = {}, headers = {}) {
    return this.requestRoute('put', resource, params, headers);
  }

  /*
   * DELETE Request
   */
  delete(resource, params = {}, headers = {}) {
    return this.requestRoute('delete', resource, params, headers);
  }

  ///////////////////////////
  // Helper functions

  mockRoutes() {
    this.fetch = fetchMock.sandbox();
    this.fetch.config.fallbackToNetwork = true;

    const delay = (data) => () => new Promise((res, rej) => setTimeout(() => res(data), this.mockDelay));

    Object.keys(this.routes).forEach(resourceName => {
      const resource = this.routes[resourceName];
      Object.keys(resource).forEach(verb => {
        try {
          const relativeRoute = resource[verb];
          const fullRoute = this.getRoute(verb, resourceName).url;
          const mockData = this.mocks[relativeRoute][verb];
          this.fetch.mock('express:' + fullRoute, delay(mockData), {method: verb});
        } catch(e) { }
      })
    })
  }

  getRoute(verb, resource, params = null) {
    let route = this.routes[resource][verb];
    let parsedParams = params || {};

    if (params) {
      const inlineParams = (route.match(/:[^\/]*/g) || []).map(param => param.replace(':', ''))

      route = route.replace(/:[^\/]*/g, (param,_) =>
        params[param.replace(':', '')] || param);

      parsedParams = omit(params, inlineParams);
    }

    return {
      url: this.url + route,
      params: parsedParams
    };
  }

  requestRoute(verb, resource, params = null, headers = {}) {
    const route = this.getRoute(verb, resource, params);
    return this.request(verb, route.url, route.params, headers);
  }

  constructGetUrl(route, params) {
    const url = new URL(route);
    url.search = new URLSearchParams(params)
    return url;
  }

  request(verb, route, params = {}, additionalHeaders = {}) {
    let url = route;

    const isUsingUrlParams = verb == 'get' && !this.isMocking;
    if (isUsingUrlParams) {
      let builder = new URL(route);
      builder.search = new URLSearchParams(params);
      url = route + builder.search;
    }

    const fetchOptions = {
      method: verb,
      body: isUsingUrlParams ? null : JSON.stringify(params),
      headers: {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*',
       'Accept': 'application/json',
       'X_DOLOMITE_API_KEY': this.apiKey,
       ...additionalHeaders
      }
    };

    try {
      return this.fetch(url, fetchOptions)
        .then((response) => {
          try {
            if (response.status >= 200 && response.status < 300) {
              return response.json().then(body => ({ 
                ...body,
                data: body.data,
                globals: body.global_objects,
              }));
            }
          } catch(e) {
            throw new GenericError();
          }

          return response.json().then(body => {
            throw new ServiceError(body);
          })
        });
    } catch(e) {
      return Promise.reject(new GenericError())
    }
  }
}
