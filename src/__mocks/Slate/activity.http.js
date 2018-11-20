import * as mock from '../_globalMocks';
import MockTransfer from './__models/MockTransfer';

export default {
  '/v1/wallets/:address/transfers': {
    get: () => mock.Paged((path, request, params) => {
      const pathParams = mock.paramsFrom(path, '/v1/wallets/:address/transfers');
      const address = pathParams.address;
      const pageSize = params.page_size;

      return {
        data: MockTransfer.fakeFor(address, pageSize)
      };
    })
  }
};
