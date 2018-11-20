import Package from '../common/Package';
import WalletService from './Wallets/WalletService';
import ActivityService from './Activity/ActivityService';

const SLATE_API_URL = 'https://exchange-api.dolomite.io';
const SLATE_WEBSOCKET_URL = 'wss://exchange-api.dolomite.io/ws-connect';

/*
 * 
 */
export default class Slate extends Package {
  constructor() {
    super({
      url: SLATE_API_URL,
      services: {
        wallets: WalletService,
        activity: ActivityService
      }
    });
  }
}
