import * as mock from '../../_globalMocks';

// random number to rounded precision


export default class MockMarket {
  static fake({ ticker = 'LRC', secondaryTicker = 'WETH', price = 0, volume = 0, change = 0 } = {}) {
    return {
      market: `${ticker}-${secondaryTicker}`,
      primary_token: ticker,
      secondary_token: secondaryTicker,
      metric_period: 86400000,
      period_high: mock.Number(price + 15 * (price / 20)),
      period_low: mock.Number(price - 15 * (price / 20)),
      period_amount: mock.Number(volume / 8, ticker),
      period_volume: mock.Number(volume),
      period_change: `${change}%`,
      current_price: mock.Number(price),
      current_high: mock.Number(price + (price / 20)),
      current_low: mock.Number(price - (price / 20)),
    };
  }

  static get All() {
    return [
      MockMarket.fake({
        ticker: 'LRC',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00071388, 8),
        volume: mock.randomRounded(20.022, 3),
        change: mock.randomRounded(3.21, 2),
      }),
      MockMarket.fake({
        ticker: 'APPC',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00041909, 8),
        volume: mock.randomRounded(10.556, 3),
        change: mock.randomRounded(5.89, 2),
      }),
      MockMarket.fake({
        ticker: 'BAT',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00067225, 8),
        volume: mock.randomRounded(4.78, 3),
        change: mock.randomRounded(4.13, 2),
      }),
      MockMarket.fake({
        ticker: 'BNB',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.03374237, 8),
        volume: mock.randomRounded(3.56, 3),
        change: mock.randomRounded(-2.21, 2),
      }),
      MockMarket.fake({
        ticker: 'OMG',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.01290687, 8),
        volume: mock.randomRounded(7.55, 3),
        change: mock.randomRounded(0.63, 2),
      }),
      MockMarket.fake({
        ticker: 'MKR',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(1.41545687, 8),
        volume: mock.randomRounded(2.801, 3),
        change: mock.randomRounded(-4.50, 2),
      }),
      MockMarket.fake({
        ticker: 'WTC',
        secondaryTicker: 'WETH',
        price: mock.randomRounded(0.00772232, 8),
        volume: mock.randomRounded(5.94, 3),
        change: mock.randomRounded(2.92, 2),
      }),
    ];
  }
}
