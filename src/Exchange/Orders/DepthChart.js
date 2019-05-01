import BigNumber from '../../common/BigNumber';

/*
 * Volume (Depth) of sell or buy orders at a price
 */
export class OrderDepth {
  constructor({ primary_amount, secondary_amount, amount_usd, exchange_rate }) {
    this.quantity = new BigNumber(primary_amount);
    this.total = new BigNumber(secondary_amount);
    this.totalUsd = amount_usd && new BigNumber(amount_usd);

    // const price = this.total.amount / this.quantity.amount;
    this.price = BigNumber.fromFloat(exchange_rate);
  }

  static build(depthArray) {
    return depthArray.map(depthJson => new OrderDepth(depthJson));
  }
}

/*
 * Holds the OrderDepths for buy and sell orders
 */
export default class OrderDepthChart {
  constructor(pair, buys, sells) {
    this.marketPair = pair;
    this.buyDepths = buys;
    this.sellDepths = sells;
  }

  static build({ market, buys, sells }) {
    const buyDepths = OrderDepth.build(buys);
    const sellDepths = OrderDepth.build(sells);
    return new OrderDepthChart(market, buyDepths, sellDepths);
  }
}
