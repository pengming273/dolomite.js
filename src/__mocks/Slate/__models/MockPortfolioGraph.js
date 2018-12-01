import * as mock from '../../_globalMocks.js';
import Period from '../../../Slate/Wallets/Period';

const periodTime = (period) => ({
  [Period.ONE_DAY]: 24 * 60 * 60 * 1000,
  [Period.ONE_WEEK]: 24 * 60 * 60 * 1000 * 7,
  [Period.ONE_MONTH]: 24 * 60 * 60 * 1000 * 7 * 30,
  [Period.THREE_MONTH]: 24 * 60 * 60 * 1000 * 7 * 30 * 3,
  [Period.SIX_MONTH]: 24 * 60 * 60 * 1000 * 7 * 30 * 6,
  [Period.ONE_YEAR]: 24 * 60 * 60 * 1000 * 7 * 30 * 12,
  [Period.ALL_TIME]: 24 * 60 * 60 * 1000 * 7 * 30 * 24,
})[period];

const fakePoint = (timestamp) => ({
  timestamp: timestamp,
  value: "0"
});

export default class MockPortfolio {
  static fake(period) {
    const count = 250;

    const time = Date.now();
    const timespan = periodTime(period);
    const intervalTime = timespan / count;

    return [...Array(count)].map((_, i) => {
      const timestamp = time - (i * intervalTime);
      return fakePoint(timestamp);
    }).reverse();
  }
}
