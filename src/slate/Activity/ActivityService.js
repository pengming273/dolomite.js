import Service from '../../common/Service';
import Transfer from './Transfer';

import mocks from '../../__mocks/Slate/activity.http.js';
import wsmocks from '../../__mocks/Slate/websockets/activity.ws.js';

const asString = (o, grab) => (!o || typeof o === 'string' || o instanceof String) ? o : grab(o);

export default class ActivityService extends Service {
  constructor(url, websocket) {
    const routes = {
      transfers: {
        get: '/v1/wallets/:address/events'
      },
      tokenTransfers: {
        get: '/v1/wallets/:address/transfers/:token'
      }
    };
  
    super(url, websocket, routes, mocks, wsmocks);
  }

  getTransfers(address, options = {}) {    
    const token = asString(options.token, (t) => t.contractAddress || t.ticker);

    return this.pageable('transfers')
      .build(data => Transfer.build(data, address))
      .get(options, { address, token });
  }

  getTokenTransfers(address, options = {}) {
    const token = asString(options.token, (t) => t.contractAddress || t.ticker);

    return this.pageable('tokenTransfers')
      .build(data => Transfer.build(data, address))
      .get(options, { address, token });
  }

  watchTransfers(address) {
    this.watchedTransferAddress = address;

    return this.send('/v1/wallets/-address-/events', 'subscribe', {
      address: address
    });
  }

  onTransferUpdate(callback) {
    this.on('/v1/wallets/-address-/events', 'update')
      .build(data => Transfer.build(data, this.watchedTransferAddress))
      .then(callback);
  }
}

ActivityService.exports = {
  Transfer
}
