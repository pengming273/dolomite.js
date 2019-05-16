"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PaymentMethod =
/*#__PURE__*/
function () {
  function PaymentMethod(_ref) {
    var wyre_payment_method_id = _ref.wyre_payment_method_id,
        created_at = _ref.created_at,
        name = _ref.name,
        nickname = _ref.nickname,
        default_ticker = _ref.default_ticker,
        status = _ref.status,
        type = _ref.type,
        method_name = _ref.method_name,
        last_four_digits = _ref.last_four_digits,
        brand = _ref.brand,
        country_code = _ref.country_code,
        is_disabled = _ref.is_disabled,
        is_deposits_supported = _ref.is_deposits_supported,
        is_payments_supported = _ref.is_payments_supported,
        chargeable_currency_tickers = _ref.chargeable_currency_tickers,
        depositable_currency_tickers = _ref.depositable_currency_tickers,
        blockchains = _ref.blockchains,
        min_charge_amount = _ref.min_charge_amount,
        max_charge_amount = _ref.max_charge_amount,
        min_deposit_amount = _ref.min_deposit_amount,
        max_deposit_amount = _ref.max_deposit_amount,
        method_expiration_display = _ref.method_expiration_display;

    _classCallCheck(this, PaymentMethod);

    this.id = wyre_payment_method_id;
    this.transferType = type;
    this.countryCode = country_code;
    this.status = status;
    this.isDisabled = is_disabled;
    this.supportsDeposits = is_deposits_supported;
    this.supportsWithdrawals = is_payments_supported;
    this.defaultTicker = default_ticker;
    this.withdrawableTickers = chargeable_currency_tickers || [];
    this.depositableTickers = depositable_currency_tickers || [];
    this.withdrawalAddresses = blockchains || {};
    this.minWithdrawalAmount = min_charge_amount;
    this.maxWithdrawalAmount = max_charge_amount;
    this.minDepositAmount = min_deposit_amount;
    this.maxDepositAmount = max_deposit_amount;
    this.name = name;
    this.nickname = nickname;
    this.lastFourDigits = last_four_digits;
    this.methodBrand = brand;
    this.methodName = method_name;
    this.methodExpirationDisplay = method_expiration_display;
    this.createdAt = new Date(created_at);
  }

  _createClass(PaymentMethod, null, [{
    key: "build",
    value: function build(paymentMethodsJson) {
      return paymentMethodsJson.map(function (paymentMethod) {
        return new PaymentMethod(paymentMethod);
      });
    }
  }]);

  return PaymentMethod;
}();

var _default = PaymentMethod;
exports["default"] = _default;