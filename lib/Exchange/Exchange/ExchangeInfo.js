"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Basic information about the Exchange
 */
var ExchangeInfo = function ExchangeInfo(_ref) {
  var loopring_contract_address = _ref.loopring_contract_address,
      fee_collecting_wallet_address = _ref.fee_collecting_wallet_address,
      loopring_delegate_address = _ref.loopring_delegate_address,
      server_time = _ref.server_time,
      time_zone = _ref.time_zone,
      min_usd_trade_amount = _ref.min_usd_trade_amount,
      min_usd_fee_amount = _ref.min_usd_fee_amount,
      maker_fee_percentage = _ref.maker_fee_percentage,
      taker_fee_percentage = _ref.taker_fee_percentage,
      min_eth_fee_amount = _ref.min_eth_fee_amount;

  _classCallCheck(this, ExchangeInfo);

  this.loopringContractAddress = loopring_contract_address;
  this.loopringDelegateAddress = loopring_delegate_address;
  this.feeCollectingWalletAddress = fee_collecting_wallet_address;
  this.serverTime = server_time;
  this.timeZone = time_zone;
  this.minUsdTradeAmount = new _BigNumber["default"](min_usd_trade_amount);
  this.minUsdFeeAmount = new _BigNumber["default"](min_usd_fee_amount);
  this.minEthFeeAmount = new _BigNumber["default"](min_eth_fee_amount);
  this.makerFee = maker_fee_percentage;
  this.takerFee = taker_fee_percentage;
};

exports["default"] = ExchangeInfo;