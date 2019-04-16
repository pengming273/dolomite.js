"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Details of an account
 */
var Account = function Account(_ref) {
  var daily_max_trade_amount_usd = _ref.daily_max_trade_amount_usd,
      dolomite_account_id = _ref.dolomite_account_id,
      filled_trade_amount_usd = _ref.filled_trade_amount_usd,
      is_residence_in_supported_region = _ref.is_residence_in_supported_region,
      daily_used_trade_amount_usd = _ref.daily_used_trade_amount_usd,
      open_trade_amount_usd = _ref.open_trade_amount_usd,
      total_crypto_currency_amount_traded = _ref.total_crypto_currency_amount_traded,
      total_crypto_currency_fees_paid = _ref.total_crypto_currency_fees_paid,
      total_fiat_currency_amount_traded = _ref.total_fiat_currency_amount_traded,
      total_fiat_currency_fees_paid = _ref.total_fiat_currency_fees_paid,
      upgrading_to_verification_tier_number = _ref.upgrading_to_verification_tier_number,
      verification_tier_number = _ref.verification_tier_number,
      wallet_addresses = _ref.wallet_addresses,
      account_gateway_status = _ref.account_gateway_status;

  _classCallCheck(this, Account);

  this.id = dolomite_account_id;
  this.address = wallet_addresses[0];
  this.addresses = wallet_addresses;
  this.isResidenceSupported = is_residence_in_supported_region;
  this.totalTraded = new _BigNumber["default"](total_fiat_currency_amount_traded);
  this.totalFeesPaid = new _BigNumber["default"](total_fiat_currency_fees_paid);
  this.totalTradedCrypto = new _BigNumber["default"](total_crypto_currency_amount_traded);
  this.totalFeesPaidCrypto = new _BigNumber["default"](total_crypto_currency_fees_paid);
  this.tier = verification_tier_number;
  this.isVerified = verification_tier_number > 0;
  this.isUpgradingTier = !!upgrading_to_verification_tier_number;
  this.upgradingToTier = upgrading_to_verification_tier_number;
  this.dailyLimit = new _BigNumber["default"](daily_max_trade_amount_usd).amount;
  this.dailyUsage = new _BigNumber["default"](daily_used_trade_amount_usd).amount;
};

exports["default"] = Account;