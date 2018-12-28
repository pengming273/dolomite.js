Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _globalMocks = require('../_globalMocks');

var mock = _interopRequireWildcard(_globalMocks);

var _modelsMockPortfolio = require('./__models/MockPortfolio');

var _modelsMockPortfolio2 = _interopRequireDefault(_modelsMockPortfolio);

var _modelsMockHolding = require('./__models/MockHolding');

var _modelsMockHolding2 = _interopRequireDefault(_modelsMockHolding);

var _modelsMockPortfolioGraph = require('./__models/MockPortfolioGraph');

var _modelsMockPortfolioGraph2 = _interopRequireDefault(_modelsMockPortfolioGraph);

var _SlateWalletsPeriod = require('../../Slate/Wallets/Period');

var _SlateWalletsPeriod2 = _interopRequireDefault(_SlateWalletsPeriod);

exports['default'] = {
  '/v1/wallets/:address/portfolio-info': {
    get: function get() {
      return {
        data: _modelsMockPortfolio2['default'].fake()
      };
    }
  },
  '/v1/wallets/:address/holding-info': {
    get: function get() {
      return mock.Paged(function (path, request, params) {
        return {
          data: [_modelsMockHolding2['default'].fake(5.156, 'ETH', {
            currentValue: 1.0,
            amountChange: 0.05,
            percentChange: 0.04
          }), _modelsMockHolding2['default'].fake(0.51, 'WETH', {
            currentValue: 1.0,
            amountChange: 0.05,
            percentChange: 0.04
          }), _modelsMockHolding2['default'].fake(3200, 'LRC', {
            currentValue: 0.00045,
            amountChange: 0.00005,
            percentChange: 0.06
          }), _modelsMockHolding2['default'].fake(500, 'APPC', {
            currentValue: 0.00025,
            amountChange: 0.00005,
            percentChange: 0.10
          })]
        };
      });
    }
  },
  '/v1/wallets/:address/historical-values': {
    get: function get(path, request) {
      var period = request.body.period || _SlateWalletsPeriod2['default'].ONE_DAY;

      return {
        data: {
          currency: {
            name: { singular: 'Dollar', plural: 'Dollars' },
            ticker: 'USD',
            precision: 5,
            display_precision: 2
          },
          time_price_pairs: _modelsMockPortfolioGraph2['default'].fake(period)
        }
      };
    }
  }
};
module.exports = exports['default'];