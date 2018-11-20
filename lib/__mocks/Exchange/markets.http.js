Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _globalMocks = require('../_globalMocks');

var mock = _interopRequireWildcard(_globalMocks);

var _modelsMockMarket = require('./__models/MockMarket');

var _modelsMockMarket2 = _interopRequireDefault(_modelsMockMarket);

var _modelsMockToken = require('./__models/MockToken');

var _modelsMockToken2 = _interopRequireDefault(_modelsMockToken);

exports['default'] = {
  '/v1/markets': {
    get: mock.Paged(function (path, request, params) {
      return {
        global_objects: {
          tokens: _modelsMockToken2['default'].All
        },
        data: _modelsMockMarket2['default'].All
      };
    })
  }
};
module.exports = exports['default'];