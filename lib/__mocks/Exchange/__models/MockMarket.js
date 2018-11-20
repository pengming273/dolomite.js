Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _globalMocks = require('../../_globalMocks');

var mock = _interopRequireWildcard(_globalMocks);

// random number to rounded precision

var MockMarket = (function () {
  function MockMarket() {
    _classCallCheck(this, MockMarket);
  }

  _createClass(MockMarket, null, [{
    key: 'fake',
    value: function fake() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$ticker = _ref.ticker;
      var ticker = _ref$ticker === undefined ? 'LRC' : _ref$ticker;
      var _ref$secondaryTicker = _ref.secondaryTicker;
      var secondaryTicker = _ref$secondaryTicker === undefined ? 'WETH' : _ref$secondaryTicker;
      var _ref$price = _ref.price;
      var price = _ref$price === undefined ? 0 : _ref$price;
      var _ref$volume = _ref.volume;
      var volume = _ref$volume === undefined ? 0 : _ref$volume;
      var _ref$change = _ref.change;
      var change = _ref$change === undefined ? 0 : _ref$change;

      return {
        market: ticker + '-' + secondaryTicker,
        primary_token: ticker,
        secondary_token: secondaryTicker,
        metric_period: 86400000,
        period_high: mock.Number(price + 15 * (price / 20)),
        period_low: mock.Number(price - 15 * (price / 20)),
        period_amount: mock.Number(volume / 8, ticker),
        period_volume: mock.Number(volume),
        period_change: change + '%',
        current_price: mock.Number(price),
        current_high: mock.Number(price + price / 20),
        current_low: mock.Number(price - price / 20)
      };
    }
  }, {
    key: 'All',
    get: function get() {
      return [MockMarket.fake({
        ticker: 'LRC',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00071388, 8),
        volume: mock.randomRounded(20.022, 3),
        change: mock.randomRounded(3.21, 2)
      }), MockMarket.fake({
        ticker: 'APPC',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00041909, 8),
        volume: mock.randomRounded(10.556, 3),
        change: mock.randomRounded(5.89, 2)
      }), MockMarket.fake({
        ticker: 'BAT',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00067225, 8),
        volume: mock.randomRounded(4.78, 3),
        change: mock.randomRounded(4.13, 2)
      }), MockMarket.fake({
        ticker: 'BNB',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.03374237, 8),
        volume: mock.randomRounded(3.56, 3),
        change: mock.randomRounded(-2.21, 2)
      }), MockMarket.fake({
        ticker: 'OMG',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.01290687, 8),
        volume: mock.randomRounded(7.55, 3),
        change: mock.randomRounded(0.63, 2)
      }), MockMarket.fake({
        ticker: 'MKR',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(1.41545687, 8),
        volume: mock.randomRounded(2.801, 3),
        change: mock.randomRounded(-4.50, 2)
      }), MockMarket.fake({
        ticker: 'WTC',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00772232, 8),
        volume: mock.randomRounded(5.94, 3),
        change: mock.randomRounded(2.92, 2)
      })];
    }
  }]);

  return MockMarket;
})();

exports['default'] = MockMarket;
module.exports = exports['default'];