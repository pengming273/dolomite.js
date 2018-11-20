import * as mock from '../../_globalMocks.js';
import MockTokenSummary from './MockTokenSummary';

export default class MockHolding {
  static fake(balance, ticker, { currentValue, amountChange, percentChange }) {
    return {
      owner_address: mock.address(),
      token_summary: MockTokenSummary.All[ticker],
      balance: mock.NumberAround(balance, ticker, 4),
      current_value: mock.NumberAround(currentValue, 'ETH'),
      amount_change_value: mock.NumberAround(amountChange, 'ETH'),
      percentage_change_value: mock.randomRounded(percentChange, 4)
    };
  }
}
