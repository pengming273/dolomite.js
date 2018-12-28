Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _WSMockedConnection = require('./WSMockedConnection');

var _WSMockedConnection2 = _interopRequireDefault(_WSMockedConnection);

var _WSMockedConnection3 = _interopRequireDefault(_WSMockedConnection);

/*
 * 
 */

var WSManager = (function () {
  function WSManager() {
    _classCallCheck(this, WSManager);

    this.mocks = {};
    this.connection = _WSMockedConnection2['default'].none;
  }

  _createClass(WSManager, [{
    key: 'mock',
    value: function mock() {
      var _this = this;

      this.setConnection(new _WSMockedConnection3['default']({
        getMocks: function getMocks() {
          return _this.mocks;
        }
      }));
    }
  }, {
    key: 'registerMocks',
    value: function registerMocks(mocks) {
      var _this2 = this;

      Object.keys(mocks).forEach(function (route) {
        if (!_this2.mocks[route]) _this2.mocks[route] = mocks[route];else Object.keys(mocks[route]).forEach(function (action) {
          _this2.mocks[route][action] = mocks[route][action];
        });
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(route, action, callback) {
      this.connection.subscribe(route, action, callback);
    }
  }, {
    key: 'send',
    value: function send(route, action, payload) {
      return this.connection.send(route, action, payload);
    }
  }, {
    key: 'setConnection',
    value: function setConnection(connection) {
      var previousConnection = this.connection;
      previousConnection.disconnect();
      connection.addSubscriptions(previousConnection.getSubscriptions());
      this.connection = connection;
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.connection.disconnect();
      this.connection = _WSMockedConnection2['default'].none;
    }
  }, {
    key: 'isConnected',
    value: function isConnected() {
      var conn = this.connection || { isConnected: function isConnected() {
          return false;
        } };
      return conn.isConnected() || false;
    }
  }]);

  return WSManager;
})();

exports['default'] = WSManager;
module.exports = exports['default'];