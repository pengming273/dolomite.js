import Service from '../../common/Service';
import TokenSummary from './TokenSummary';
import TokenDetails from './TokenDetails';

import mocks from '../../__mocks/Slate/wallets.http.js';
import wsmocks from '../../__mocks/Slate/websockets/wallets.ws.js';

/*
 * Service for the Token resource in the
 * Market API.
 */
export default class TokenService extends Service {
  constructor(url, websocket) {
    const routes = {
      currencies: {
        get: '/currencies'
      },
      rates: {
        get: '/v1/assets/rates/latest'
      },
      search: {
        get: '/v1/assets/search?token_types=ERC20&token_types=ETH'
      },
      details: {
        get: '/v1/assets/:identifier'
      },
    };

    super(url, websocket, routes, mocks, wsmocks);
  }

  getAll(term = '', sort = 'HIGHEST_MARKET_CAP', options = {}) {
    return this.pageable('search')
      .build((data) => TokenDetails.build(data))
      .get(options, {
        sort_order: sort,
        search_term: term
      });
  }

  getDetails(identifier) {
    return this.get('details', { identifier: identifier })
      .then(body => new TokenDetails(body.data));
  }

  getExchangeRates() {
    return this.get('rates')
      .then(body => body.data);
  }

  watchExchangeRates() {
    return this.send('/v1/assets/rates/latest', 'subscribe');
  }

  onExchangeRatesUpdate(callback) {
    return this.on('/v1/assets/rates/latest', 'update')
      .then(callback);
  }
}

TokenService.exports = {
  Token: TokenSummary
};
