Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _globalMocksJs = require('../../_globalMocks.js');

var mock = _interopRequireWildcard(_globalMocksJs);

var _slateWalletsPortfolio = require('../../../slate/Wallets/Portfolio');

var _slateWalletsPortfolio2 = _interopRequireDefault(_slateWalletsPortfolio);

var MockPortfolio = (function () {
  function MockPortfolio() {
    _classCallCheck(this, MockPortfolio);
  }

  _createClass(MockPortfolio, null, [{
    key: 'fake',
    value: function fake() {
      return {
        owner_address: mock.address(),
        portfolio_period: _slateWalletsPortfolio2['default'].Period.ONE_DAY,
        currency: {
          name: 'Ethereum',
          ticker: 'ETH',
          precision: 18,
          display_precision: 8
        },
        current_value: mock.NumberAround(20, 'ETH', 2),
        amount_change_value: mock.NumberAround(0.5, 'ETH', 5),
        percent_change: mock.randomRounded(0.03, 4)
      };
    }
  }]);

  return MockPortfolio;
})();

exports['default'] = MockPortfolio;
module.exports = exports['default'];