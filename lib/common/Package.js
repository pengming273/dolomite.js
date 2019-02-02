Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _websocketsWSManager = require('./websockets/WSManager');

var _websocketsWSManager2 = _interopRequireDefault(_websocketsWSManager);

var _websocketsWSConnection = require('./websockets/WSConnection');

var _websocketsWSConnection2 = _interopRequireDefault(_websocketsWSConnection);

var Package = (function () {
  function Package(_ref) {
    var _this = this;

    var url = _ref.url;
    var websocketUrl = _ref.websocketUrl;
    var services = _ref.services;

    _classCallCheck(this, Package);

    this.url = url;
    this.wsUrl = websocketUrl;
    this.wsManager = new _websocketsWSManager2['default']();

    Object.keys(services).forEach(function (name) {
      var ServiceType = services[name];
      _this[name] = new ServiceType(url, function () {
        return _this.wsManager;
      });
    });

    this.serviceTypes = Object.keys(services).map(function (name) {
      return services[name];
    });
    this.services = Object.keys(services).map(function (name) {
      return _this[name];
    });
  }

  _createClass(Package, [{
    key: 'configure',
    value: function configure(_ref2) {
      var apiKey = _ref2.apiKey;
      var mockDelay = _ref2.mockDelay;
      var shouldMock = _ref2.shouldMock;

      if (apiKey) {
        this.services.forEach(function (service) {
          return service.configure(apiKey);
        });
      } else if (mockDelay != null || shouldMock != null) {
        this.services.forEach(function (service) {
          return service.configureOptions({ mockDelay: mockDelay, shouldMock: shouldMock });
        });
      }
    }
  }, {
    key: 'connectToWebsocket',
    value: function connectToWebsocket() {
      var _this2 = this;

      var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var shouldMock = _ref3.shouldMock;

      if (shouldMock) return this.mockConnectionToWebsocket();

      var connection = new _websocketsWSConnection2['default'](this.wsUrl);
      return connection.establish().then(function (data) {
        _this2.wsManager.setConnection(connection);
        return data;
      })['catch'](function (error) {
        _this2.wsManager.disconnect();
        throw error;
      });
    }
  }, {
    key: 'onReconnect',
    value: function onReconnect(callback) {
      this.wsManager && this.wsManager.onReconnect(callback);
    }
  }, {
    key: 'mockConnectionToWebsocket',
    value: function mockConnectionToWebsocket() {
      return regeneratorRuntime.async(function mockConnectionToWebsocket$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            this.wsManager.mock();

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'isConnected',
    get: function get() {
      return this.wsManager ? this.wsManager.isConnected() : false;
    }
  }, {
    key: 'exports',
    get: function get() {
      var classes = {};

      this.serviceTypes.forEach(function (ServiceType) {
        classes = _extends({}, classes, ServiceType.exports || {});
      });

      return classes;
    }
  }]);

  return Package;
})();

exports['default'] = Package;
module.exports = exports['default'];