import BigNumber from '../../common/BigNumber';
import TokenSummary from '../Tokens/TokenSummary';

const toSide = (_from, _to, owner) => {
  if (owner === _to) return Transfer.Side.RECEIVED;
  if (owner === _from) return Transfer.Side.SENT;
  return Transfer.Side.UNKNOWN;
}

export default class Transfer {
  constructor({ transaction_id, transaction_hash, primary_wallet_address, secondary_wallet_address, dolomite_token_id, 
    timestamp, block_height, transfer_type, transaction_cost_eth,transaction_cost_fiat, 
    transfer_amount_token, transfer_amount_eth, transfer_amount_fiat, token_summary}, ownerAddress) {

    this.id = transaction_id;
    this.transactionHash = transaction_hash;
    this.fromAddress = primary_wallet_address;
    this.toAddress = secondary_wallet_address;
    this.side = toSide(this.fromAddress, this.toAddress, ownerAddress);
    this.timestamp = new Date(parseInt(timestamp));
    this.block = block_height;
    this.type = transfer_type;
    this.fee = new BigNumber(transaction_cost_eth);
    this.feeFiat = new BigNumber(transaction_cost_fiat);
    this.value = new BigNumber(transfer_amount_token);
    this.valueETH = new BigNumber(transfer_amount_eth);
    this.valueFiat = new BigNumber(transfer_amount_fiat);
    this.tokenId = dolomite_token_id;
    this.token = new TokenSummary(token_summary);
  }

  static build(transferArratJson, ownerAddress) {
    return transferArratJson.map(transferJson => new Transfer(transferJson, ownerAddress));
  }
}

Transfer.Type = {
  TOKEN: 'TOKEN',
  ETHER: 'ETHER',
  WETH_DEPOSIT: 'WETH-DEPOSIT',
  WETH_WITHDRAWAL: 'WETH-WITHDRAWAL',
  CONTRACT: 'CONTRACT',
};

Transfer.Side = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
  UNKNOWN: 'UNKNOWN'
};

Transfer.Types = Object.values(Transfer.Type);
Transfer.Sides = Object.values(Transfer.Side);
