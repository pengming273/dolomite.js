
class PaymentMethod {
  constructor({ trade_account_payment_method_id, created_at, name, nickname, default_ticker,
    status, type, method_name, last_four_digits, brand, country_code, is_disabled,
    is_deposits_supported, is_payments_supported, chargeable_currency_tickers, depositable_currency_tickers,
    blockchain_deposit_addresses, min_charge_amount, max_charge_amount, min_deposit_amount, max_deposit_amount, 
    method_expiration_display }) {
    
    this.id = trade_account_payment_method_id;
    this.transferType = type;
    this.countryCode = country_code;
    
    this.status = status;
    this.isDisabled = is_disabled;
    this.supportsDeposits = is_deposits_supported;
    this.supportsWithdrawals = is_payments_supported;

    this.defaultTicker = default_ticker;
    this.withdrawableTickers = chargeable_currency_tickers || [];
    this.depositableTickers = depositable_currency_tickers || [];
    this.withdrawalAddresses = blockchain_deposit_addresses || {};

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

  static build(paymentMethodsJson) {
    return paymentMethodsJson.map(paymentMethod => new PaymentMethod(paymentMethod));
  }
}

export default PaymentMethod;
