import * as mock from '../_globalMocks';
import MockPortfolio from './__models/MockPortfolio';
import MockHolding from './__models/MockHolding';
import MockPortfolioGraph from './__models/MockPortfolioGraph';
import Period from '../../Slate/Wallets/Period';

export default {
  '/v1/wallets/:address/portfolio-info': {
    get: () => ({
      data: MockPortfolio.fake()
    }),
  },
  '/v1/wallets/:address/holding-info': {
    get: () => mock.Paged((path, request, params) => {
      return {
        data: [
          MockHolding.fake(5.156, 'ETH', {
            currentValue: 1.0,
            amountChange: 0.05,
            percentChange: 0.04,
          }),
          MockHolding.fake(0.51, 'WETH', {
            currentValue: 1.0,
            amountChange: 0.05,
            percentChange: 0.04,
          }),
          MockHolding.fake(3200, 'LRC', {
            currentValue: 0.00045,
            amountChange: 0.00005,
            percentChange: 0.06,
          }),
          MockHolding.fake(500, 'APPC', {
            currentValue: 0.00025,
            amountChange: 0.00005,
            percentChange: 0.10,
          }),
        ]
      };
    })
  },
  '/v1/wallets/:address/historical-values': {
    get: (path, request) => {
      const period = request.body.period || Period.ONE_DAY;
      
      return {
        data: {
          currency: {
            name: { singular: 'Dollar', plural: 'Dollars' },
            ticker: 'USD',
            precision: 5,
            display_precision: 2
          },
          time_price_pairs: MockPortfolioGraph.fake(period)
        }
      }
    }
  },
};
