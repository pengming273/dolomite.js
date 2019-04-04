import BigNumber from '../../common/BigNumber';
import Token from '../Tokens/Token';

/*
 * Balances for different tokens
 */
export default class Balance {
  constructor({ asset, token, balance }) {
    this.balance = BigNumber.build(balance, asset.precision);
    this.token = new Token(token);
    this.asset = this.token;

    // Deprecated
    this.committed = BigNumber.build(0, 0);
    this.allowance = BigNumber.build(0, 0);
  }

  static build(balancesAsJson) {
    return balancesAsJson.map(balanceJson => new Balance(balanceJson));
  }

  static hydrate(balancesAsJson, globals) {
    const tokens = globals.tokens || {};

    const balancesWithTokens = balancesAsJson.map(balance => {
      const token = tokens[balance.asset.ticker];
      balance.token = token || balance.asset;
      return balance;
    });

    return Balance.build(balancesWithTokens);
  }
}

/*
 * Balances, Committed amount & Allowances for different tokens
 */
export class BalanceInfo {
  constructor({ asset, token, balance, committed, allowance }) {
    this.balance = new BigNumber(balance);
    this.committed = new BigNumber(committed);
    this.allowance = new BigNumber(allowance);
    this.available = this.balance.dup.calc(val => val - this.committed.value);
    this.token = new Token(token);
    this.asset = this.token;
  }

  static build(balancesAsMap) {
    const built = {};

    Object.keys(balancesAsMap).forEach((ticker) => {
      built[ticker] = new BalanceInfo(balancesAsMap[ticker]);
    });

    return built;
  }

  static hydrate(balancesAsMap, globals) {
    const tokens = globals.tokens || {};
    const hydrated = {};

    Object.keys(balancesAsMap).forEach((ticker) => {
      hydrated[ticker] = {
        ...balancesAsMap[ticker],
        token: tokens[ticker]
      };
    });

    return BalanceInfo.build(hydrated);
  }
}
