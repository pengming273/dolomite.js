import Service from '../../common/Service';
import Market from './Market';

export default class MarketService extends Service {
  constructor(url, websocket) {
    const routes = {
      markets: {
        get: '/v1/markets'
      }
    };

    super(url, websocket, routes);
  }

  getAll(options = {}) {
    return this.get('markets', options)
      .then(body => Market.hydrate(body.data, body.globals));
  }
}
