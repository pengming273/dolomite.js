import * as mock from '../_globalMocks';
import MockMarket from './__models/MockMarket';
import MockToken from './__models/MockToken';

export default {
  '/v1/markets': {
    get: mock.Paged((path, request, params) => {
      return { 
        global_objects: {
          tokens: MockToken.All
        },
        data: MockMarket.All
      };
    })
  },
};
