Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonBigNumber = require('../../common/BigNumber');

var _commonBigNumber2 = _interopRequireDefault(_commonBigNumber);

var _TokensToken = require('../Tokens/Token');

var _TokensToken2 = _interopRequireDefault(_TokensToken);

var isObject = function isObject(o) {
  return o !== null && typeof o === "object";
};
var toToken = function toToken(t) {
  return isObject(t) ? new _TokensToken2['default'](t) : t;
};

/*
 * Details of a token-pair/market
 */

var Market = (function () {
  function Market(_ref) {
    var market = _ref.market;
    var primary_token = _ref.primary_token;
    var secondary_token = _ref.secondary_token;
    var metric_period = _ref.metric_period;
    var period_high = _ref.period_high;
    var period_low = _ref.period_low;
    var period_amount = _ref.period_amount;
    var period_volume = _ref.period_volume;
    var period_change = _ref.period_change;
    var current_price = _ref.current_price;
    var current_high = _ref.current_high;
    var current_low = _ref.current_low;

    _classCallCheck(this, Market);

    this.market = market;
    this.primaryToken = toToken(primary_token);
    this.secondaryToken = toToken(secondary_token);
    this.metricPeriod = metric_period;
    this.lastPrice = new _commonBigNumber2['default'](current_price);
    this.highestBid = new _commonBigNumber2['default'](current_high);
    this.lowestAsk = new _commonBigNumber2['default'](current_low);
    this.volumePrimaryToken = new _commonBigNumber2['default'](period_amount);
    this.volumeSecondaryToken = new _commonBigNumber2['default'](period_volume);
    this.changePeriod = {
      highPrice: new _commonBigNumber2['default'](period_high),
      lowPrice: new _commonBigNumber2['default'](period_low),
      percentDifference: _commonBigNumber2['default'].fromFloat(period_change)
    };

    // Deprecated
    this.pair = market;
  }

  /*
   * Different periods for basic market data
   */

  _createClass(Market, null, [{
    key: 'build',
    value: function build(marketJsonArray) {
      return marketJsonArray.map(function (marketJson) {
        return new Market(marketJson);
      });
    }
  }, {
    key: 'hydrate',
    value: function hydrate(marketJsonArray, globals) {
      var tokens = globals.tokens || {};

      var markets = marketJsonArray.map(function (market) {
        market.primary_token = tokens[market.primary_token];
        market.secondary_token = tokens[market.secondary_token];
        return market;
      });

      return Market.build(markets);
    }
  }]);

  return Market;
})();

exports['default'] = Market;
Market.Period = {
  ONE_HOUR: 'ONE_HOUR',
  ONE_DAY: 'ONE_DAY',
  ONE_WEEK: 'ONE_WEEK',
  ONE_MONTH: 'ONE_MONTH'
};

Market.Periods = Object.values(Market.Period);
module.exports = exports['default'];