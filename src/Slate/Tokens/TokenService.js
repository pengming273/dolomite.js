import Service from '../../common/Service';
import Token from './Token';
//import mocks from '../../__mocks/tokens';
//import wsmocks from '../../__mocks/websockets/tokens';
import TokenSearchResult from './TokenSearchResult';

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
                //get: '/v1/assets/search?search_term=&token_types=ERC20&token_types=ETH&sort_order=HIGHEST_MARKET_CAP'
                //get: '/v1/assets/search?search_term=lrc&token_types=ERC20&token_types=ETH&sort_order=HIGHEST_MARKET_CAP'
            },
            details: {
                get: '/v1/assets/:identifier'
            },
        };

        super(url, websocket, routes, mocks, wsmocks);
    }

    /*
     * Returns Pageable[Token]
     *
     * Options:
     * pageSize
     * page
     * sort: Token.SortType
     */
    getAll(term='', sort='HIGHEST_MARKET_CAP', options = {}) {
        return this.pageable('search')
          .build((data) => TokenSearchResult.build(data))
          .get(options, {
            sort_order: sort,
            search_term: term
          });
        //return this.get('search', { term, sort });
        //return new Promise((resolve, reject) => resolve({term, sort}));
    }

    getDetails(identifier) {
        return this.get('details', { identifier: identifier, base_symbol: 'USD' })
            /*.then(body => body.data)*/;
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
    Token
};