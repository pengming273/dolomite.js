import Service from '../../common/Service';
import Market from './Market';

import mocks from '../../__mocks/Exchange/markets.http.js';
import wsmocks from '../../__mocks/Exchange/websockets/markets.ws.js';

export default class MarketService extends Service {
  constructor(url, websocket) {
    const routes = {
      markets: {
        get: '/v1/markets'
      }
    };

    super(url, websocket, routes, mocks, wsmocks);
  }

  getAll(options = {}) {
    return this.get('markets', options)
      .then(body => Market.hydrate(body.data, body.globals));
  }
}
