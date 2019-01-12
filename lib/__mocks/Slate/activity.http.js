Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _globalMocks = require('../_globalMocks');

var mock = _interopRequireWildcard(_globalMocks);

var _modelsMockTransfer = require('./__models/MockTransfer');

var _modelsMockTransfer2 = _interopRequireDefault(_modelsMockTransfer);

exports['default'] = {
  '/v1/wallets/:address/events': {
    get: function get() {
      return mock.Paged(function (path, request, params) {
        var pathParams = mock.paramsFrom(path, '/v1/wallets/:address/events');
        var address = pathParams.address;
        var pageSize = params.page_size;

        return {
          data: _modelsMockTransfer2['default'].fakeFor(address, pageSize)
        };
      });
    }
  }
};
module.exports = exports['default'];