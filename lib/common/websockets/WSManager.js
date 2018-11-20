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
  }

  _createClass(WSManager, null, [{
    key: 'registerMocks',
    value: function registerMocks(mocks) {
      Object.keys(mocks).forEach(function (route) {
        if (!WSManager.mocks[route]) WSManager.mocks[route] = mocks[route];else Object.keys(mocks[route]).forEach(function (action) {
          WSManager.mocks[route][action] = mocks[route][action];
        });
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(route, action, callback) {
      WSManager.connection.subscribe(route, action, callback);
    }
  }, {
    key: 'send',
    value: function send(route, action, payload) {
      return WSManager.connection.send(route, action, payload);
    }
  }, {
    key: 'setConnection',
    value: function setConnection(connection) {
      var previousConnection = WSManager.connection;
      previousConnection.disconnect();
      connection.addSubscriptions(previousConnection.getSubscriptions());
      WSManager.connection = connection;
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      WSManager.connection.disconnect();
      WSManager.connection = _WSMockedConnection2['default']['interface'];
    }
  }]);

  return WSManager;
})();

exports['default'] = WSManager;

WSManager.mocks = {};
WSManager.connection = new _WSMockedConnection3['default']({
  getMocks: function getMocks() {
    return WSManager.mocks;
  }
});
module.exports = exports['default'];