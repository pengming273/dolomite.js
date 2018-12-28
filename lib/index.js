Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ExchangeExchange = require('./Exchange/Exchange');

var _ExchangeExchange2 = _interopRequireDefault(_ExchangeExchange);

var _SlateSlate = require('./Slate/Slate');

var _SlateSlate2 = _interopRequireDefault(_SlateSlate);

var exchange = _ExchangeExchange2['default'];
exports.exchange = exchange;
var slate = _SlateSlate2['default'];

exports.slate = slate;
exports['default'] = "Hello";