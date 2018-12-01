Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonBigNumber = require('../../common/BigNumber');

var _commonBigNumber2 = _interopRequireDefault(_commonBigNumber);

var _Period = require('./Period');

var _Period2 = _interopRequireDefault(_Period);

var toPercent = function toPercent(p) {
  return parseFloat(((p || 0) * 100).toFixed(2));
};

/*
 * Portfolio Info object
 */

var Portfolio = function Portfolio(_ref) {
  var owner_address = _ref.owner_address;
  var portfolio_period = _ref.portfolio_period;
  var currency = _ref.currency;
  var current_value = _ref.current_value;
  var amount_change_value = _ref.amount_change_value;
  var percent_change = _ref.percent_change;

  _classCallCheck(this, Portfolio);

  this.address = owner_address;
  this.period = portfolio_period;
  this.currentValue = new _commonBigNumber2['default'](current_value);
  this.amountChange = new _commonBigNumber2['default'](amount_change_value);
  this.percentChange = toPercent(percent_change);
};

exports['default'] = Portfolio;

Portfolio.Period = _Period2['default'];
Portfolio.Periods = Object.values(_Period2['default']);
module.exports = exports['default'];