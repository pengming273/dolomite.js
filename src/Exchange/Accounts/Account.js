import BigNumber from '../../common/BigNumber';

/*
 * Details of an account
 */
export default class Account {
  constructor({ daily_max_trade_amount_usd, dolomite_account_id, filled_trade_amount_usd,
    is_residence_in_supported_region, daily_used_trade_amount_usd, open_trade_amount_usd, 
    total_crypto_currency_amount_traded, total_crypto_currency_fees_paid, total_fiat_currency_amount_traded, 
    total_fiat_currency_fees_paid, upgrading_to_verification_tier_number, verification_tier_number, 
    wallet_addresses }) {
    
    this.id = dolomite_account_id;
    this.address = wallet_addresses[0];
    this.addresses = wallet_addresses;
    this.isResidenceSupported = is_residence_in_supported_region;
    
    this.totalTraded = new BigNumber(total_fiat_currency_amount_traded);
    this.totalFeesPaid = new BigNumber(total_fiat_currency_fees_paid);
    this.totalTradedCrypto = new BigNumber(total_crypto_currency_amount_traded);
    this.totalFeesPaidCrypto = new BigNumber(total_crypto_currency_fees_paid);

    this.tier = verification_tier_number;
    this.isVerified = verification_tier_number > 0;
    this.isUpgradingTier = !!upgrading_to_verification_tier_number;
    this.upgradingToTier = upgrading_to_verification_tier_number;
    this.dailyLimit = (new BigNumber(daily_max_trade_amount_usd)).amount;
    this.dailyUsage = (new BigNumber(daily_used_trade_amount_usd)).amount;
  }
}
