Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonBigNumber = require('../../common/BigNumber');

var _commonBigNumber2 = _interopRequireDefault(_commonBigNumber);

var PortfolioGraph = (function (_Array) {
  _inherits(PortfolioGraph, _Array);

  function PortfolioGraph(_ref) {
    var currency = _ref.currency;
    var time_price_pairs = _ref.time_price_pairs;
    var period = _ref.period;

    _classCallCheck(this, PortfolioGraph);

    _get(Object.getPrototypeOf(PortfolioGraph.prototype), 'constructor', this).call(this);

    this.currency = currency;
    this.period = period;

    var data = time_price_pairs.map(function (point) {
      return {
        timestamp: point.timestamp,
        price: _commonBigNumber2['default'].build(point.value, currency.precision)
      };
    });

    this.push.apply(this, _toConsumableArray(data));
  }

  return PortfolioGraph;
})(Array);

exports['default'] = PortfolioGraph;
module.exports = exports['default'];