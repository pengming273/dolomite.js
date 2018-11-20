Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Errors
 */
var Errors = {
  Pageable: {
    CANNOT_GET_NEXT_PAGE: 'Cannot load the next page'
  },
  PageableRequest: {
    NO_REQUEST: 'PageableRequest requires you set callback with `request`',
    NO_BUILD: 'PageableRequest requires you set callback with `build`'
  }
};

/*
 * Pagable responses can be constructed using pagable.
 *
 * Example Usage:
 * const response = // ... JSON Response
 * const paged = new Pageable(response, Tokens.build);
 *
 * Suggested Usage (Usage in route function):
 * return Pageable.request((params) => this.get('route', params))
 *   .build((data, global) => Resource.hydrate(data, global))
 *   .get(<params>)
 */

var Pageable = (function (_Array) {
  _inherits(Pageable, _Array);

  function Pageable(_ref) {
    var paging_metadata = _ref.paging_metadata;
    var data = _ref.data;
    var global_objects = _ref.global_objects;
    var buildCallbackOrRequest = arguments.length <= 1 || arguments[1] === undefined ? function () {
      return [];
    } : arguments[1];

    _classCallCheck(this, Pageable);

    _get(Object.getPrototypeOf(Pageable.prototype), 'constructor', this).call(this);
    this.cursor = paging_metadata.cursor;
    this.pageNumber = paging_metadata.page_number;
    this.pageSize = paging_metadata.page_size;
    this.sortOrder = paging_metadata.sort_order;

    if (buildCallbackOrRequest.isPageableRequest) {
      this.request = buildCallbackOrRequest;
      this.buildData = this.request.buildData;
    } else {
      this.buildData = buildCallbackOrRequest;
    }

    var responseData = data || [];
    var responseGlobals = global_objects || {};
    var list = this.buildData(responseData, responseGlobals);
    this.push.apply(this, _toConsumableArray(list));
  }

  /*
   * Usage:
   * const params = withPageableParams(options, {
   *   address: address,
   *   sort: sort 
   * });
   */

  /*
   * Update this page's fields with another page's fields
   */

  _createClass(Pageable, [{
    key: 'updatePageFields',
    value: function updatePageFields(nextPage) {
      this.cursor = nextPage.cursor;
      this.pageNumber = nextPage.page_number;
      this.pageSize = nextPage.page_size;
      this.sortOrder = nextPage.sort_order;
    }

    /*
     * Build a request. This enables the `getNextPage` functionality
     * automatically
     */
  }, {
    key: 'getNextPage',

    /*
     * Returns a Promise that resolves with the same instance of
     * page that `getNextPage` was called on (now with updated data
     * and paging related fields)
     */
    value: function getNextPage() {
      if (!this.canGetNextPage) return new Promise(function (res, rej) {
        return rej(Errors.Pageable.CANNOT_GET_NEXT_PAGE);
      });

      return this.request.get(_extends({}, this.request.options, {
        page_number: this.pageNumber + 1,
        page_size: this.pageSize
      }), null, this);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return [].concat(_toConsumableArray(this));
    }
  }, {
    key: 'canGetNextPage',
    get: function get() {
      return !!this.request && this.hasNextPage;
    }
  }, {
    key: 'hasNextPage',
    get: function get() {
      // TODO: implement this
      return true;
    }
  }], [{
    key: 'request',
    value: function request(requestCallback) {
      return new PageableRequest().request(requestCallback);
    }
  }]);

  return Pageable;
})(Array);

exports['default'] = Pageable;
var withPageableParams = function withPageableParams() {
  var allOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var actualParams = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var params = _extends({
    page_number: allOptions.page || 0,
    page_size: allOptions.pageSize || 50
  }, actualParams);

  delete params.pageSize;
  delete params.page;

  var cleaned = function cleaned(obj) {
    return Object.keys(obj).filter(function (key) {
      return obj[key];
    }).reduce(function (newObj, key) {
      newObj[key] = obj[key];
      return newObj;
    }, {});
  };

  return cleaned(params);
};

exports.withPageableParams = withPageableParams;
/*
 * Handles a Pageable request. Add a request function, a build function
 * and options... it handles the rest.
 */

var PageableRequest = (function () {
  function PageableRequest() {
    _classCallCheck(this, PageableRequest);

    this.makeRequest = function () {
      return new Promise(function (res, rej) {
        return rej(Errors.PageableRequest.NO_REQUEST);
      });
    };
    this.buildData = function () {
      return new Promise(function (res, rej) {
        return rej(Errors.PageableRequest.NO_BUILD);
      });
    };
  }

  _createClass(PageableRequest, [{
    key: 'request',
    value: function request(requestCallback) {
      this.makeRequest = requestCallback;
      return this;
    }
  }, {
    key: 'build',
    value: function build(buildCallback) {
      this.buildData = buildCallback;
      return this;
    }
  }, {
    key: 'get',
    value: function get(options, optionsActual, previousPage) {
      var _this = this;

      var params = withPageableParams(options, optionsActual || options);

      if (!this.options) this.options = params;

      return this.makeRequest(_extends({}, this.options, params)).then(function (body) {
        return new Pageable(body, _this);
      }).then(function (nextPage) {
        var page = nextPage;

        if (previousPage) {
          previousPage.updatePageFields(nextPage);
          previousPage.push.apply(previousPage, _toConsumableArray(nextPage));
          page = previousPage;
        }

        return page;
      });
    }
  }, {
    key: 'isPageableRequest',
    get: function get() {
      return true;
    }
  }]);

  return PageableRequest;
})();