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
  var account_gateway_status = _ref.account_gateway_status,
      current_verification_tier_number = _ref.current_verification_tier_number,
      dolomite_account_id = _ref.dolomite_account_id,
      failed_upgrading_to_verification_tier_number = _ref.failed_upgrading_to_verification_tier_number,
      limits = _ref.limits,
      metrics = _ref.metrics,
      upgrading_to_verification_tier_number = _ref.upgrading_to_verification_tier_number,
      wallet_addresses = _ref.wallet_addresses;

  _classCallCheck(this, Account);

  var daily_filled_trade_amount_usd = limits.daily_filled_trade_amount_usd,
      daily_max_trade_amount_usd = limits.daily_max_trade_amount_usd,
      daily_used_trade_amount_usd = limits.daily_used_trade_amount_usd,
      open_trade_amount_usd = limits.open_trade_amount_usd;
  var total_crypto_currency_amount_traded = metrics.total_crypto_currency_amount_traded,
      total_crypto_currency_fees_paid = metrics.total_crypto_currency_fees_paid,
      total_fiat_currency_amount_traded = metrics.total_fiat_currency_amount_traded,
      total_fiat_currency_fees_paid = metrics.total_fiat_currency_fees_paid;
  this.id = dolomite_account_id;
  this.address = wallet_addresses[0];
  this.addresses = wallet_addresses;
  this.isResidenceSupported = true; //is_residence_in_supported_region;

  this.totalTraded = new _BigNumber["default"](total_fiat_currency_amount_traded);
  this.totalFeesPaid = new _BigNumber["default"](total_fiat_currency_fees_paid);
  this.totalTradedCrypto = new _BigNumber["default"](total_crypto_currency_amount_traded);
  this.totalFeesPaidCrypto = new _BigNumber["default"](total_crypto_currency_fees_paid);
  this.approvalStatus = account_gateway_status;
  this.tier = current_verification_tier_number;
  this.isVerified = current_verification_tier_number > 0;
  this.isUpgradingTier = !!upgrading_to_verification_tier_number;
  this.upgradingToTier = upgrading_to_verification_tier_number;
  this.failedUpgradingToTier = failed_upgrading_to_verification_tier_number;
  this.didFailUpgradingTier = !!failed_upgrading_to_verification_tier_number;
  this.dailyLimit = new _BigNumber["default"](daily_max_trade_amount_usd).amount;
  this.dailyUsage = new _BigNumber["default"](daily_used_trade_amount_usd).amount;
};

exports["default"] = Account;