"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _WSManager = _interopRequireDefault(require("./websockets/WSManager"));

var _WSConnection = _interopRequireDefault(require("./websockets/WSConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Package =
/*#__PURE__*/
function () {
  function Package(_ref) {
    var _this = this;

    var url = _ref.url,
        websocketUrl = _ref.websocketUrl,
        services = _ref.services;

    _classCallCheck(this, Package);

    this.url = url;
    this.wsUrl = websocketUrl;
    this.wsManager = new _WSManager["default"]();
    this.services = this.setupServicesFor(function (k, v) {
      return _this[k] = v;
    }, services);
    this.serviceTypes = Object.keys(services).map(function (name) {
      return services[name];
    });
  }

  _createClass(Package, [{
    key: "setupServicesFor",
    value: function setupServicesFor(setParent, services) {
      var _this2 = this;

      var allServices = [];
      Object.keys(services).forEach(function (serviceName) {
        var ServiceType = services[serviceName];
        var service = new ServiceType(_this2.url, function () {
          return _this2.wsManager;
        }, ServiceType.routes);
        var subServices = ServiceType.services || [];

        _this2.setupServicesFor(function (k, v) {
          return service[k] = v;
        }, subServices).forEach(function (s) {
          return allServices.push(s);
        });

        setParent(serviceName, service);
        allServices.push(service);
      });
      return allServices;
    }
  }, {
    key: "configure",
    value: function configure(_ref2) {
      var apiKey = _ref2.apiKey;
      this.services.forEach(function (service) {
        return service.configure(apiKey);
      });
    }
  }, {
    key: "connectToWebsocket",
    value: function connectToWebsocket() {
      var _this3 = this;

      var connection = new _WSConnection["default"](this.wsUrl);
      return connection.establish().then(function (data) {
        _this3.wsManager.setConnection(connection);

        return data;
      })["catch"](function (error) {
        _this3.wsManager.disconnect();

        throw error;
      });
    }
  }, {
    key: "onReconnect",
    value: function onReconnect(callback) {
      this.wsManager && this.wsManager.onReconnect(callback);
    }
  }, {
    key: "isConnected",
    get: function get() {
      return this.wsManager ? this.wsManager.isConnected() : false;
    }
  }, {
    key: "exports",
    get: function get() {
      var classes = {};
      this.serviceTypes.forEach(function (ServiceType) {
        classes = _objectSpread({}, classes, ServiceType.exports || {});
      });
      return classes;
    }
  }]);

  return Package;
}();

exports["default"] = Package;