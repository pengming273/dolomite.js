import BigNumber from '../../common/BigNumber';
import TokenSummary from '../Tokens/TokenSummary';

export default class Transfer {
  constructor({ transaction_hash, primary_wallet_address, secondary_wallet_address, dolomite_token_id, 
    timestamp, block_height, transfer_type, transaction_cost_eth,transaction_cost_fiat, 
    transfer_amount_token, transfer_amount_eth, transfer_amount_fiat, token_summary}) {

    this.transactionHash = transaction_hash;
    this.fromAddress = primary_wallet_address;
    this.toAddress = secondary_wallet_address;
    this.timestamp = new Date(parseInt(timestamp));
    this.block = block_height;
    this.type = transfer_type;
    this.fee = new BigNumber(transaction_cost_eth);
    this.feeFiat = new BigNumber(transaction_cost_fiat);
    this.amount = new BigNumber(transfer_amount_token);
    this.amountETH = new BigNumber(transfer_amount_eth);
    this.amountFiat = new BigNumber(transfer_amount_fiat);
    this.tokenId = dolomite_token_id;
    this.token = new TokenSummary(token_summary);
  }

  static build(transferArratJson) {
    return transferArratJson.map(transferJson => new Transfer(transferJson));
  }
}

Transfer.Type = {
  TOKEN: 'TOKEN',
  ETHER: 'ETHER',
  WETH_DEPOSIT: 'WETH-DEPOSIT',
  WETH_WITHDRAWAL: 'WETH-WITHDRAWAL'
};

Transfer.Types = Object.values(Transfer.Type);
