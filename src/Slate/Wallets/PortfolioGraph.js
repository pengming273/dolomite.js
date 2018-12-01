import BigNumber from '../../common/BigNumber';

export default class PortfolioGraph extends Array {
  constructor({ currency, time_price_pairs }) {
    super();

    this.currency = currency;

    const data = time_price_pairs.map(point => ({
      timestamp: point.timestamp,
      price: BigNumber.build(point.value, currency.precision)
    }));

    this.push(...data);
  }
}
