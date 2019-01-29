Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _WSConnection2 = require('./WSConnection');

var _WSConnection3 = _interopRequireDefault(_WSConnection2);

/*
 * 
 */

var WSMockedConnection = (function (_WSConnection) {
  _inherits(WSMockedConnection, _WSConnection);

  function WSMockedConnection(_ref) {
    var getMocks = _ref.getMocks;

    _classCallCheck(this, WSMockedConnection);

    _get(Object.getPrototypeOf(WSMockedConnection.prototype), 'constructor', this).call(this, null);
    this.getMocks = getMocks;
    this.startMocking();
  }

  _createClass(WSMockedConnection, [{
    key: 'findMock',
    value: function findMock(route, action) {
      var routeLevel = this.mocks[route];
      if (routeLevel) {
        var actionLevel = routeLevel[action];
        if (actionLevel) return actionLevel;
      }
      return {};
    }
  }, {
    key: 'mock',
    value: function mock(route, action) {
      var givenData = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var data = givenData;
      if (!data) {
        var mock = this.findMock(route, action);
        if (mock.down) data = mock.down();
      }

      if (this.subscribers[route] && this.subscribers[route][action] && !!data) this.subscribers[route][action].forEach(function (callback) {
        return setTimeout(function () {
          return callback(data);
        }, 0);
      });
    }
  }, {
    key: 'mockAll',
    value: function mockAll() {
      var _this = this;

      Object.keys(this.mocks).forEach(function (route) {
        Object.keys(_this.mocks[route]).forEach(function (action) {
          _this.mock(route, action);
        });
      });
    }
  }, {
    key: 'startMocking',
    value: function startMocking() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.mockAll();
      }, 100);
      this.interval = setInterval(function () {
        return _this2.mockAll();
      }, 10000);
    }

    // Overridden
  }, {
    key: 'disconnect',
    value: function disconnect() {
      if (this.interval) clearInterval(this.interval);
    }

    // Overridden
  }, {
    key: 'isConnected',
    value: function isConnected() {
      return true;
    }

    // Overridden
  }, {
    key: 'send',
    value: function send(route, action, payload) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var mock = _this3.findMock(route, action);
        if (!mock.up) reject(new Error('Mocks not implemented'));else {
          setTimeout(function () {
            mock.up(payload, function (route, action, data) {
              return _this3.mock(route, action, data);
            });
          }, 300);
          resolve(null);
        }
      });
    }
  }, {
    key: 'mocks',
    get: function get() {
      return this.getMocks();
    }
  }]);

  return WSMockedConnection;
})(_WSConnection3['default']);

exports['default'] = WSMockedConnection;
module.exports = exports['default'];