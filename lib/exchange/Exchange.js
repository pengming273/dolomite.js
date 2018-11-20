Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonPackage = require('../common/Package');

var _commonPackage2 = _interopRequireDefault(_commonPackage);

var _MarketsMarketService = require('./Markets/MarketService');

var _MarketsMarketService2 = _interopRequireDefault(_MarketsMarketService);

var EXCHANGE_API_URL = 'https://exchange-api.dolomite.io';
var EXCHANGE_WEBSOCKET_URL = 'wss://exchange-api.dolomite.io/ws-connect';

/*
 * 
 */

var Exchange = (function (_Package) {
  _inherits(Exchange, _Package);

  function Exchange() {
    _classCallCheck(this, Exchange);

    _get(Object.getPrototypeOf(Exchange.prototype), 'constructor', this).call(this, {
      url: EXCHANGE_API_URL,
      services: {
        markets: _MarketsMarketService2['default']
      }
    });
  }

  return Exchange;
})(_commonPackage2['default']);

exports['default'] = Exchange;
module.exports = exports['default'];