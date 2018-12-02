import Service from '../../common/Service';
import WSWrapper from '../../common/websockets/WSWrapper';

import Portfolio from './Portfolio';
import Holding from './Holding';
import PortfolioGraph from './PortfolioGraph';
import Period from './Period';

import mocks from '../../__mocks/Slate/wallets.http.js';
import wsmocks from '../../__mocks/Slate/websockets/wallets.ws.js';

export default class WalletService extends Service {
  constructor(url, websocket) {
    const routes = {
      portfolio: {
        get: '/v1/wallets/:address/portfolio-info'
      },
      holdings: {
        get: '/v1/wallets/:address/holding-info'
      },
      graph: {
        get: '/v1/wallets/:address/historical-values'
      },
    };

    super(url, websocket, routes, mocks, wsmocks);
  }

  getPortfolio(address) {
    return this.get('portfolio', { address })
      .then(body => new Portfolio(body.data));
  }

  getHoldings(address, options) {
    // return this.pageable('holdings')
    //   .build(data => Holding.build(data))
    //   .get({ address, options });
    return this.get('holdings', { address, options })
      .then(body => Holding.build(body.data));
  }

  getPortfolioGraph(address, period = Portfolio.Period.ONE_DAY) {
    return this.get('graph', { address, period })
      .then(body => new PortfolioGraph({ period, ...body.data }));
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

WalletService.exports = {
  Period
};
