Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _globalMocks = require('../../_globalMocks');

var mock = _interopRequireWildcard(_globalMocks);

var _slateActivityTransfer = require('../../../slate/Activity/Transfer');

var _slateActivityTransfer2 = _interopRequireDefault(_slateActivityTransfer);

var _MockTokenSummary = require('./MockTokenSummary');

var _MockTokenSummary2 = _interopRequireDefault(_MockTokenSummary);

var MockTransfer = (function () {
  function MockTransfer() {
    _classCallCheck(this, MockTransfer);
  }

  _createClass(MockTransfer, null, [{
    key: 'fake',
    value: function fake(address) {
      var type = mock.sample(_slateActivityTransfer2['default'].Types);
      var to = mock.sample(['FROM', 'TO']) == 'TO';
      var primaryAddress = to ? mock.address() : address;
      var secondaryAddress = to ? address : mock.address();

      var isToken = type == _slateActivityTransfer2['default'].Type.TOKEN;
      var isEth = type == _slateActivityTransfer2['default'].Type.ETHER;
      var isWeth = type == _slateActivityTransfer2['default'].Type.WETH_DEPOSIT || _slateActivityTransfer2['default'].Type.WETH_WITHDRAWAL;
      var token = isToken ? _MockTokenSummary2['default'].random : isEth ? _MockTokenSummary2['default'].All.ETH : isWeth ? _MockTokenSummary2['default'].All.WETH : null;

      var amount = mock.randomChange(1, 0.9);
      var fee = mock.randomChange(0.002, 0.05);

      return {
        transaction_hash: mock.transactionHash(),
        primary_wallet_address: primaryAddress,
        secondary_wallet_address: secondaryAddress,
        dolomite_token_id: -1,
        timestamp: Date.now(),
        block_height: 6500000,
        transfer_type: type,
        transaction_cost_eth: mock.Number(fee),
        transaction_cost_fiat: mock.Number(mock.fromEth(fee, 'USD')),
        transfer_amount_token: token && mock.Number(mock.fromEth(amount, token.ticker)),
        transfer_amount_eth: token && mock.Number(amount),
        transfer_amount_fiat: token && mock.Number(mock.fromEth(amount, 'USD')),
        token_summary: token
      };
    }
  }, {
    key: 'fakeFor',
    value: function fakeFor(address, count) {
      return [].concat(_toConsumableArray(new Array(count))).map(function (i) {
        return MockTransfer.fake(address);
      });
    }
  }]);

  return MockTransfer;
})();

exports['default'] = MockTransfer;
module.exports = exports['default'];