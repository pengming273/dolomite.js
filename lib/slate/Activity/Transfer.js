Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonBigNumber = require('../../common/BigNumber');

var _commonBigNumber2 = _interopRequireDefault(_commonBigNumber);

var _TokensTokenSummary = require('../Tokens/TokenSummary');

var _TokensTokenSummary2 = _interopRequireDefault(_TokensTokenSummary);

var Transfer = (function () {
  function Transfer(_ref) {
    var transaction_hash = _ref.transaction_hash;
    var primary_wallet_address = _ref.primary_wallet_address;
    var secondary_wallet_address = _ref.secondary_wallet_address;
    var dolomite_token_id = _ref.dolomite_token_id;
    var timestamp = _ref.timestamp;
    var block_height = _ref.block_height;
    var transfer_type = _ref.transfer_type;
    var transaction_cost_eth = _ref.transaction_cost_eth;
    var transaction_cost_fiat = _ref.transaction_cost_fiat;
    var transfer_amount_token = _ref.transfer_amount_token;
    var transfer_amount_eth = _ref.transfer_amount_eth;
    var transfer_amount_fiat = _ref.transfer_amount_fiat;
    var token_summary = _ref.token_summary;

    _classCallCheck(this, Transfer);

    this.transactionHash = transaction_hash;
    this.fromAddress = primary_wallet_address;
    this.toAddress = secondary_wallet_address;
    this.timestamp = new Date(parseInt(timestamp));
    this.block = block_height;
    this.type = transfer_type;
    this.fee = new _commonBigNumber2['default'](transaction_cost_eth);
    this.feeFiat = new _commonBigNumber2['default'](transaction_cost_fiat);
    this.amount = new _commonBigNumber2['default'](transfer_amount_token);
    this.amountETH = new _commonBigNumber2['default'](transfer_amount_eth);
    this.amountFiat = new _commonBigNumber2['default'](transfer_amount_fiat);
    this.tokenId = dolomite_token_id;
    this.token = new _TokensTokenSummary2['default'](token_summary);
  }

  _createClass(Transfer, null, [{
    key: 'build',
    value: function build(transferArratJson) {
      return transferArratJson.map(function (transferJson) {
        return new Transfer(transferJson);
      });
    }
  }]);

  return Transfer;
})();

exports['default'] = Transfer;

Transfer.Type = {
  TOKEN: 'TOKEN',
  ETHER: 'ETHER',
  WETH_DEPOSIT: 'WETH-DEPOSIT',
  WETH_WITHDRAWAL: 'WETH-WITHDRAWAL'
};

Transfer.Types = Object.values(Transfer.Type);
module.exports = exports['default'];