Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x19, _x20, _x21) { var _again = true; _function: while (_again) { var object = _x19, property = _x20, receiver = _x21; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x19 = parent; _x20 = property; _x21 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fetchMock = require('fetch-mock');

var _fetchMock2 = _interopRequireDefault(_fetchMock);

var _objectOmit = require('object.omit');

var _objectOmit2 = _interopRequireDefault(_objectOmit);

var _Pageable = require('./Pageable');

var _Pageable2 = _interopRequireDefault(_Pageable);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _websocketsWSManager = require('./websockets/WSManager');

var _websocketsWSManager2 = _interopRequireDefault(_websocketsWSManager);

var getNativeFetch = function getNativeFetch() {
  if (window && window.fetch) return window.fetch.bind(window);
  return _nodeFetch2['default'];
};

var ServiceError = (function (_Error) {
  _inherits(ServiceError, _Error);

  function ServiceError(_ref) {
    var category = _ref.category;
    var code = _ref.code;
    var description = _ref.description;
    var invalid_fields = _ref.invalid_fields;
    var request_id = _ref.request_id;

    _classCallCheck(this, ServiceError);

    _get(Object.getPrototypeOf(ServiceError.prototype), 'constructor', this).call(this, category + '/' + code + ' : ' + description);

    this.category = category;
    this.code = code;
    this.description = description;
    this.invalidFields = invalid_fields;
    this.requestId = request_id;
  }

  return ServiceError;
})(Error);

exports.ServiceError = ServiceError;

var GenericError = (function (_ServiceError) {
  _inherits(GenericError, _ServiceError);

  function GenericError() {
    _classCallCheck(this, GenericError);

    _get(Object.getPrototypeOf(GenericError.prototype), 'constructor', this).call(this, {
      category: 'GENERIC_ERROR',
      code: 'SOMETHING_WENT_WRONG',
      description: 'Something went wrong',
      invalid_fields: [],
      request_id: -1
    });
  }

  /*
   * Super class for all services that provides request
   * mocking, api key handling, fetch requests with helper
   * functions (get, post, etc.) and routing
   */
  return GenericError;
})(ServiceError);

exports.GenericError = GenericError;

var Service = (function () {
  function Service(url) {
    var routes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var mocks = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var wsMocks = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Service);

    this.url = url;
    this.apiKey = null;

    this.routes = routes;
    this.mocks = mocks;
    this.wsMocks = wsMocks;

    _websocketsWSManager2['default'].registerMocks(wsMocks);
    this.configureOptions();
  }

  /*
   * Configure the service with an API key. Will remove
   * mock requests and the API key will be added to the
   * header of every request
   */

  _createClass(Service, [{
    key: 'configure',
    value: function configure(apiKey) {
      this.apiKey = apiKey;
      this.fetch = getNativeFetch();
      this.isMocking = false;
    }

    /*
     * Configure the options for the service
     */
  }, {
    key: 'configureOptions',
    value: function configureOptions() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
  }, {
    key: 'pageable',
    value: function pageable(resource) {
      var _this = this;

      var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return _Pageable2['default'].request(function (params) {
        return _this.get(resource, params, headers);
      });
    }

    /*
     * Subscribe to a websocket route with a callback and build function
     *
     * Usage: 
     * on(<route>, <action>)
     *   .build(rawData => new Obj(data))
     *   .then(<callbackFunc>);
     */
  }, {
    key: 'on',
    value: function on(route, action) {
      return {
        build: function build(buildCallback) {
          return {
            then: function then(callback) {
              _websocketsWSManager2['default'].subscribe(route, action, function (data) {
                callback(buildCallback(data));
              });
            }
          };
        },
        then: function then(callback) {
          _websocketsWSManager2['default'].subscribe(route, action, function (data) {
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
  }, {
    key: 'send',
    value: function send(route, action, params) {
      return _websocketsWSManager2['default'].send(route, action, params);
    }

    /*
     * GET request
     *
     * resource: the name of the resource in the routes object
     * params: object representation of parameters. `:params` will
     *         be replaced with the matching `param` in the params
     * headers: additional headers to add to the request
     */
  }, {
    key: 'get',
    value: function get(resource) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.requestRoute('get', resource, _extends({ hydrate_all: true }, params), headers);
    }

    /*
     * POST Request
     */
  }, {
    key: 'post',
    value: function post(resource) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      console.log('\n\n\n\nPOST>>>>>>>>');
      console.log(JSON.stringify(params));
      console.log('>>>>>>>>>>>>>>>>>>>');
      return this.requestRoute('post', resource, params, headers);
    }

    /*
     * PUT Request
     */
  }, {
    key: 'put',
    value: function put(resource) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.requestRoute('put', resource, params, headers);
    }

    /*
     * DELETE Request
     */
  }, {
    key: 'delete',
    value: function _delete(resource) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.requestRoute('delete', resource, params, headers);
    }

    ///////////////////////////
    // Helper functions

  }, {
    key: 'mockRoutes',
    value: function mockRoutes() {
      var _this2 = this;

      this.fetch = _fetchMock2['default'].sandbox();
      this.fetch.config.fallbackToNetwork = true;

      var delay = function delay(data) {
        return function () {
          return new Promise(function (res, rej) {
            return setTimeout(function () {
              return res(data);
            }, _this2.mockDelay);
          });
        };
      };

      Object.keys(this.routes).forEach(function (resourceName) {
        var resource = _this2.routes[resourceName];
        Object.keys(resource).forEach(function (verb) {
          try {
            var relativeRoute = resource[verb];
            var fullRoute = _this2.getRoute(verb, resourceName).url;
            var mockData = _this2.mocks[relativeRoute][verb];
            _this2.fetch.mock('express:' + fullRoute, delay(mockData), { method: verb });
          } catch (e) {}
        });
      });
    }
  }, {
    key: 'getRoute',
    value: function getRoute(verb, resource) {
      var params = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var route = this.routes[resource][verb];
      var parsedParams = params || {};

      if (params) {
        var inlineParams = (route.match(/:[^\/]*/g) || []).map(function (param) {
          return param.replace(':', '');
        });

        route = route.replace(/:[^\/]*/g, function (param, _) {
          return params[param.replace(':', '')] || param;
        });

        parsedParams = (0, _objectOmit2['default'])(params, inlineParams);
      }

      return {
        url: this.url + route,
        params: parsedParams
      };
    }
  }, {
    key: 'requestRoute',
    value: function requestRoute(verb, resource) {
      var params = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var headers = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      var route = this.getRoute(verb, resource, params);
      return this.request(verb, route.url, route.params, headers);
    }
  }, {
    key: 'constructGetUrl',
    value: function constructGetUrl(route, params) {
      var url = new URL(route);
      url.search = new URLSearchParams(params);
      return url;
    }
  }, {
    key: 'request',
    value: function request(verb, route) {
      var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      var additionalHeaders = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      var url = route;

      var isUsingUrlParams = verb == 'get' && !this.isMocking;
      if (isUsingUrlParams) {
        var builder = new URL(route);
        builder.search = new URLSearchParams(params);
        url = route + builder.search;
      }

      var fetchOptions = {
        method: verb,
        body: isUsingUrlParams ? null : JSON.stringify(params),
        headers: _extends({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'X_DOLOMITE_API_KEY': this.apiKey
        }, additionalHeaders)
      };

      try {
        return this.fetch(url, fetchOptions).then(function (response) {
          try {
            if (response.status >= 200 && response.status < 300) {
              return response.json().then(function (body) {
                return _extends({}, body, {
                  data: body.data,
                  globals: body.global_objects
                });
              });
            }
          } catch (e) {
            throw new GenericError();
          }

          return response.json().then(function (body) {
            throw new ServiceError(body);
          });
        });
      } catch (e) {
        return Promise.reject(new GenericError());
      }
    }
  }]);

  return Service;
})();

exports['default'] = Service;