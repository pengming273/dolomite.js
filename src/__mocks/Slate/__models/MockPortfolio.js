import * as mock from '../../_globalMocks.js';
import Portfolio from '../../../slate/Wallets/Portfolio';

export default class MockPortfolio {
  static fake() {
    return {
      owner_address: mock.address(),
      portfolio_period: Portfolio.Period.ONE_DAY,
      currency: {
        name: 'Ethereum',
        ticker: 'ETH',
        precision: 18,
        display_precision: 8
      },
      current_value: mock.NumberAround(20, 'ETH', 2),
      amount_change_value: mock.NumberAround(0.5, 'ETH', 5),
      percent_change: mock.randomRounded(0.03, 4),
    };
  }
}
