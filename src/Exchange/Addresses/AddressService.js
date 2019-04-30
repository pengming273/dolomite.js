import Service from '../../common/Service';
import WSWrapper from '../../common/websockets/WSWrapper';

import Account from '../Accounts/Account';
import Balance, { BalanceInfo } from './Balance';
import Order from '../Orders/Order';

export default class AddressService extends Service {

  static routes = {
    portfolio: {
      get: '/v1/addresses/:address/portfolio'
    },
    info: { 
      get: '/v1/addresses/:address/info'
    },
    orders: {
      get: '/v1/orders/addresses/:address'
    },
  };

  static exports = {
    Balance
  };

  /////////////////////////

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

  // ----------------------------------------------
  // Portfolio

  getPortfolio(address) {
    return this.get('portfolio', { address })
      .then(body => Balance.hydrate(body.data, body.global_objects));
  }

  onPortfolioUpdate(callback) {
    // TODO: Use actual websocket when it is implemented!
    // NOTE: Websocket downstream needs to be hydrated!
    
    if (!this.portfolioWS) this.portfolioWS = new WSWrapper(() => {
      if (!this.watchAddress) return null;
      return this.getPortfolio(this.watchAddress); 
    }, 15); // update balances every 15s

    this.portfolioWS.subscribe(callback);
  }

  // ----------------------------------------------
  // Account

  getAccount(address) {
    return this.get('info', { address })
      .then(body => new Account(body.data));
  }

  onAccountUpdate(callback) {
    return this.on('/v1/addresses/-address-/info', 'update')
      .build(data => new Account(data))
      .then(callback)
  }

  // ----------------------------------------------
  // Orders

  getOrders(address, options = {}) {
    return this.get('orders', { address, ...options })
      .then(body => Order.hydrate(body.data, body.global_objects));
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
