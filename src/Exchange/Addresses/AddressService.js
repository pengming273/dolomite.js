import Service from '../../common/Service';
import WSWrapper from '../../common/websockets/WSWrapper';

import Account from '../Accounts/Account';
import Balance, { BalanceInfo } from './Balance';
import Order from '../Orders/Order';

export default class AddressService extends Service {

  static routes = {
    portfolio: {
      get: '/v1/addresses/:address/balances-deprecated'
    },
    info: { 
      get: '/v1/addresses/:address/info'
    },
    orders: {
      get: '/v1/orders/addresses/:address'
    },
    balanceInfo: {
      get: '/v1/addresses/:address/portfolio'
    }
  };

  static exports = {
    Balance,
    BalanceInfo,
  };

  /////////////////////////

  // ----------------------------------------------
  // Portfolio

  getPortfolio(address) {
    return this.get('portfolio', { address })
      .then(body => Balance.hydrate(body.data, body.global_objects));
  }

  watchPortfolio(address) {
    this.watchAddress = address;
  }

  onPortfolioUpdate(callback) {
    if (!this.portfolioWS) this.portfolioWS = new WSWrapper(() => {
      if (!this.watchAddress) return null;
      return this.getPortfolio(this.watchAddress); 
    }, 15); // update balances every 15s

    this.portfolioWS.subscribe(callback);
  }

  // ----------------------------------------------
  // Balance Info (contains committed/approved amounts)

  getBalanceInfo(address, tickers) {
    const payload = { address };
    if (tickers) payload.tickers = tickers;
    return this.get('balanceInfo', payload)
      .then(body => BalanceInfo.hydrate(body.data, body.global_objects));
  }

  onBalanceInfoUpdate(callback) {
    if (!this.balanceInfoWS) this.balanceInfoWS = new WSWrapper(() => {
      if (!this.watchAddress) return null;
      return this.getBalanceInfo(this.watchAddress); 
    }, 15); // update balance infos every 15s

    this.balanceInfoWS.subscribe(callback);
  }

  // ----------------------------------------------
  // Account

  getAccount(address) {
    return this.get('info', { address })
      .then(body => new Account(body.data));
  }

  onAccountUpdate(callback) {
    if (!this.accountInfoWS) this.accountInfoWS = new WSWrapper(() => {
      if (!this.watchAddress) return null;
      return this.getAccount(this.watchAddress).catch(() => ({})); 
    }, 15); // update account infos every 15s

    this.accountInfoWS.subscribe(callback);
    
    // return this.on('/v1/addresses/-address-/info', 'update')
    //   .build(data => new Account(data))
    //   .then(callback)
  }

  // ----------------------------------------------
  // Orders

  getOrders(address, options = {}) {
    return this.get('orders', { address, ...options })
      .then(body => Order.hydrate(body.data, body.global_objects));
  }

  watch(address) {
    this.watchAddress = address;

    return Promise.all([
      this.send('/v1/watch-wallet', 'subscribe', {
        address: address
      }),
      this.send('/v1/addresses/-address-/info', 'subscribe', {
        address: address
      })
    ]);
  }

  onOrdersUpdate(callback) {
    this.on('/v1/orders/addresses/-address-', 'update')
      .build(data => Order.build(data))
      .then(callback);
  }

  onOrdersFillingUpdate(callback) {
    this.on('/v1/orders/addresses/-address-/fills', 'update')
      .build(data => Order.build(data))
      .then(callback);
  }
}
