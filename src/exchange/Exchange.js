import Package from '../common/Package';
import MarketService from './Markets/MarketService';

const EXCHANGE_API_URL = 'https://exchange-api.dolomite.io';
const EXCHANGE_WEBSOCKET_URL = 'wss://exchange-api.dolomite.io/ws-connect';

/*
 * 
 */
class Exchange extends Package {
  constructor() {
    super({
      url: EXCHANGE_API_URL,
      websocketUrl: EXCHANGE_WEBSOCKET_URL,
      services: {
        markets: MarketService
      }
    });
  }
}


const exchange = new Exchange();
export default exchange;
