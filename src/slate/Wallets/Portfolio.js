import BigNumber from '../../common/BigNumber';

const toPercent = (p) => parseFloat(((p || 0) * 100).toFixed(2));

/*
 * Portfolio Info object
 */
export default class Portfolio {
  constructor({ owner_address, portfolio_period, currency, current_value, amount_change_value, percent_change }) {
    this.address = owner_address;
    this.period = portfolio_period;
    this.currentValue = new BigNumber(current_value);
    this.amountChange = new BigNumber(amount_change_value);
    this.percentChange = toPercent(percent_change);
  }
}

Portfolio.Period = {
  ONE_DAY: 'ONE_DAY',
  ONE_WEEK: 'ONE_WEEK',
  ONE_MONTH: 'ONE_MONTH',
  THREE_MONTH: 'THREE_MONTH',
  SIX_MONTH: 'SIX_MONTH',
  ONE_YEAR: 'ONE_YEAR',
};

Portfolio.Periods = Object.values(Portfolio.Period);
