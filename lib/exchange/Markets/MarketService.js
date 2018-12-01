Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonService = require('../../common/Service');

var _commonService2 = _interopRequireDefault(_commonService);

var _Market = require('./Market');

var _Market2 = _interopRequireDefault(_Market);

var _mocksExchangeMarketsHttpJs = require('../../__mocks/Exchange/markets.http.js');

var _mocksExchangeMarketsHttpJs2 = _interopRequireDefault(_mocksExchangeMarketsHttpJs);

var _mocksExchangeWebsocketsMarketsWsJs = require('../../__mocks/Exchange/websockets/markets.ws.js');

var _mocksExchangeWebsocketsMarketsWsJs2 = _interopRequireDefault(_mocksExchangeWebsocketsMarketsWsJs);

var MarketService = (function (_Service) {
  _inherits(MarketService, _Service);

  function MarketService(url, websocket) {
    _classCallCheck(this, MarketService);

    var routes = {
      markets: {
        get: '/v1/markets'
      }
    };

    _get(Object.getPrototypeOf(MarketService.prototype), 'constructor', this).call(this, url, websocket, routes, _mocksExchangeMarketsHttpJs2['default'], _mocksExchangeWebsocketsMarketsWsJs2['default']);
  }

  _createClass(MarketService, [{
    key: 'getAll',
    value: function getAll() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return this.get('markets', options).then(function (body) {
        return _Market2['default'].hydrate(body.data, body.globals);
      });
    }
  }]);

  return MarketService;
})(_commonService2['default']);

exports['default'] = MarketService;
module.exports = exports['default'];