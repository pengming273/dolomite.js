/*
 * Used for numbers provided by the API in the format:
 * {
 *   amount: <int>
 *   currency: {
 *     ticker: <string>,
 *     precision: <int>,
 *     display_precision: <int>
 *   }
 * }
 */
export default class BigNumber {
  constructor(raw) {
    if (raw) {
      const amount = raw.amount;
      const currency = raw.currency;
      
      this.raw = { amount, currency };
      this.value = amount;
      this.currency = {
        ticker: currency.ticker,
        precision: currency.precision,
        displayPrecision: currency.display_precision
      };

      this.precision = this.currency.precision;
      this.amount = this.value / Math.pow(10, this.precision);
    }
  }

  get dup() {
    return new BigNumber(this.raw);
  }

  modify(callback) {
    this.value = callback(this.value);
    this.amount = this.value / Math.pow(10, this.precision);
  }

  static build(value, precision, ticker = null) {
    return new BigNumber({
      amount: value,
      currency: {
        precision: precision,
        display_precision: precision,
        ticker: ticker
      }
    });
  }

  static fromFloat(number, ticker = null) {
    const num = parseFloat(number);
    const fractional = num.toString().split('.')[1];
    const decimals = fractional ? fractional.length : 0;
    const amount = num * Math.pow(10, decimals);
    return BigNumber.build(amount, decimals, ticker);
  }
}
