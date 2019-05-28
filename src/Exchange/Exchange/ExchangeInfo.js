import BigNumber from '../../common/BigNumber';

/*
 * Basic information about the Exchange
 */
export default class ExchangeInfo {
  constructor({loopring_contract_address, fee_collecting_wallet_address, loopring_delegate_address,
    server_time, time_zone, min_usd_trade_amount, min_usd_fee_amount, maker_fee_percentage,
    taker_fee_percentage, min_eth_fee_amount }) {
    
    this.loopringContractAddress = loopring_contract_address;
    this.loopringDelegateAddress = loopring_delegate_address;
    this.feeCollectingWalletAddress = fee_collecting_wallet_address;
    this.serverTime = server_time;
    this.timeZone = time_zone;
    this.minUsdTradeAmount = new BigNumber(min_usd_trade_amount);
    this.minUsdFeeAmount = new BigNumber(min_usd_fee_amount);
    this.minEthFeeAmount = new BigNumber(min_eth_fee_amount);
    this.makerFee = maker_fee_percentage;
    this.takerFee = taker_fee_percentage;
  }
}
