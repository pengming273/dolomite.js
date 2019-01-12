import MockTransfer from '../__models/MockTransfer';

let watchingTransfers;

export default {
  '/v1/wallets/-address-/events': {
    subscribe: {
      up: (params, respond) => {
        watchingTransfers = params.address;
      }
    },
    update: {
      down: () => !watchingTransfers ? null : [
        MockTransfer.fake(watchingTransfers)
      ]
    }
  }
};
