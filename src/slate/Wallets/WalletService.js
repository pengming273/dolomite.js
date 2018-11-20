import Service from '../../common/Service';
import Portfolio from './Portfolio';
import Holding from './Holding';
import WSWrapper from '../../common/websockets/WSWrapper';

import mocks from '../../__mocks/Slate/wallets.http.js';
import wsmocks from '../../__mocks/Slate/websockets/wallets.ws.js';

export default class WalletService extends Service {
  constructor(url) {
    const routes = {
      portfolio: {
        get: '/v1/wallets/:address/portfolio-info'
      },
      holdings: {
        get: '/v1/wallets/:address/holding-info'
      }
    };

    super(url, routes, mocks, wsmocks);
  }

  getPortfolio(address) {
    return this.get('portfolio', { address })
      .then(body => new Portfolio(body.data));
  }

  getHoldings(address, options) {
    return this.pageable('holdings')
      .build(data => Holding.build(data))
      .get({ address, options });
  }

  watch(address) {
    this.watchedAddress = address;
  }

  onPortfolioUpdate(callback) {
    if (!this.portfolioWS) {
      const updateInterval = 15; // seconds TODO: change

      this.portfolioWS = new WSWrapper(() => {
        if (!this.watchedAddress) return null;
        return this.getPortfolio(this.watchedAddress); 
      }, updateInterval);
    }

    this.portfolioWS.subscribe(callback);
  }

  onHoldingsUpdate(callback) {
    if (!this.holdingsWS) {
      const updateInterval = 15; // seconds TODO: change

      this.holdingsWS = new WSWrapper(() => {
        if (!this.watchedAddress) return null;
        return this.getHoldings(this.watchedAddress); 
      }, updateInterval);
    }

    this.holdingsWS.subscribe(callback);
  }
}
