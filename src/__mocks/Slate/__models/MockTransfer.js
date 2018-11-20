import * as mock from '../../_globalMocks';
import Transfer from '../../../slate/Activity/Transfer';
import MockTokenSummary from './MockTokenSummary';

export default class MockTransfer {
  static fake(address) {
    const type = mock.sample(Transfer.Types);
    const to = mock.sample(['FROM', 'TO']) == 'TO';
    const primaryAddress = to ? mock.address() : address;
    const secondaryAddress = to ? address : mock.address();

    const isToken = type == Transfer.Type.TOKEN;
    const isEth = type == Transfer.Type.ETHER;
    const isWeth = type == Transfer.Type.WETH_DEPOSIT || Transfer.Type.WETH_WITHDRAWAL;
    const token = isToken ? MockTokenSummary.random
      : isEth ? MockTokenSummary.All.ETH
      : isWeth ? MockTokenSummary.All.WETH : null;

    const amount = mock.randomChange(1, 0.9);
    const fee = mock.randomChange(0.002, 0.05);

    return {
      transaction_hash: mock.transactionHash(), 
      primary_wallet_address: primaryAddress, 
      secondary_wallet_address: secondaryAddress, 
      dolomite_token_id: -1, 
      timestamp: Date.now(), 
      block_height: 6500000, 
      transfer_type: type, 
      transaction_cost_eth: mock.Number(fee),
      transaction_cost_fiat: mock.Number(mock.fromEth(fee, 'USD')), 
      transfer_amount_token: token && mock.Number(mock.fromEth(amount, token.ticker)),
      transfer_amount_eth: token && mock.Number(amount),  
      transfer_amount_fiat: token &&mock.Number(mock.fromEth(amount, 'USD')),  
      token_summary: token
    };
  }

  static fakeFor(address, count) {
    return [...new Array(count)].map(i => MockTransfer.fake(address));
  }
}
