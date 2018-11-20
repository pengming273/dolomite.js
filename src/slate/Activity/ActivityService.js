import Service from '../../common/Service';
import Transfer from './Transfer';

import mocks from '../../__mocks/Slate/activity.http.js';
import wsmocks from '../../__mocks/Slate/websockets/activity.ws.js';

export default class ActivityService extends Service {
  constructor(url) {
    const routes = {
      transfers: {
        get: '/v1/wallets/:address/transfers'
      },
    };

    super(url, routes, mocks, wsmocks);
  }

  getTransfers(address, options) {
    return this.pageable('transfers')
      .build(data => Transfer.build(data))
      .get({ address, options });
  }

  watchTransfers(address) {
    return this.send('/v1/wallets/-address-/transfers', 'subscribe', {
      address: address
    });
  }

  onTransferUpdate(callback) {
    this.on('/v1/wallets/-address-/transfers', 'update')
      .build(data => Transfer.build(data))
      .then(callback);
  }
}
