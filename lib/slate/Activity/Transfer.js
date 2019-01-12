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

var toSide = function toSide(_from, _to, owner) {
  if (owner === _to) return Transfer.Side.RECEIVED;
  if (owner === _from) return Transfer.Side.SENT;
  return Transfer.Side.UNKNOWN;
};

var Transfer = (function () {
  function Transfer(_ref, ownerAddress) {
    var dolomite_token_id = _ref.dolomite_token_id;
    var token_summary = _ref.token_summary;
    var primary_wallet_address = _ref.primary_wallet_address;
    var event_type = _ref.event_type;
    var transaction_cost_crypto = _ref.transaction_cost_crypto;
    var transaction_cost_value = _ref.transaction_cost_value;
    var transfer_amount_token = _ref.transfer_amount_token;
    var is_transaction_successful = _ref.is_transaction_successful;
    var dolomite_transaction_id = _ref.dolomite_transaction_id;
    var ethereum_log_index = _ref.ethereum_log_index;
    var transaction_hash = _ref.transaction_hash;
    var timestamp = _ref.timestamp;
    var block_height = _ref.block_height;
    var secondary_wallet_address = _ref.secondary_wallet_address;
    var transfer_amount_value = _ref.transfer_amount_value;
    var is_contract_address = _ref.is_contract_address;

    _classCallCheck(this, Transfer);

    this.id = dolomite_transaction_id;
    this.transactionHash = transaction_hash;
    this.fromAddress = primary_wallet_address;
    this.toAddress = secondary_wallet_address;
    this.side = toSide(this.fromAddress, this.toAddress, ownerAddress);
    this.timestamp = new Date(parseInt(timestamp));
    this.block = block_height;
    this.type = event_type;
    this.fee = new _commonBigNumber2['default'](transaction_cost_crypto);
    this.feeFiat = new _commonBigNumber2['default'](transaction_cost_value);
    this.value = new _commonBigNumber2['default'](transfer_amount_token);
    this.valueFiat = new _commonBigNumber2['default'](transfer_amount_value);
    this.isSuccessful = is_transaction_successful;
    this.ethereumLogIndex = ethereum_log_index;
    this.isContractAddress = is_contract_address;
    this.tokenId = dolomite_token_id;
    this.token = new _TokensTokenSummary2['default'](token_summary);
  }

  _createClass(Transfer, null, [{
    key: 'build',
    value: function build(transferArratJson, ownerAddress) {
      return transferArratJson.map(function (transferJson) {
        return new Transfer(transferJson, ownerAddress);
      });
    }
  }]);

  return Transfer;
})();

exports['default'] = Transfer;

Transfer.Type = {
  ETHER: 'ETHER-TRANSFER',
  CONTRACT: 'CONTRACT-CALLED',
  CONTRACT_CREATED: 'CONTRACT-CREATED',
  TOKEN: 'TOKEN-TRANSFER',
  TOKEN_APPROVAL: 'TOKEN-APPROVAL',
  TOKEN_APPROVAL_RESET: 'TOKEN-APPROVAL-RESET',
  WETH_DEPOSIT: 'WETH-DEPOSIT',
  WETH_WITHDRAWAL: 'WETH-WITHDRAWAL',
  BLOCK_MINED: 'BLOCK-MINED',
  UNCLE_BLOCK_MINED: 'UNCLE-MINED',
  TRANSACTION_CANCELLED: 'TRANSACTION-CANCELLED'
};

Transfer.Side = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
  UNKNOWN: 'UNKNOWN'
};

Transfer.Types = Object.values(Transfer.Type);
Transfer.Sides = Object.values(Transfer.Side);
module.exports = exports['default'];