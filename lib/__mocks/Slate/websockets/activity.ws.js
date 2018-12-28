Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsMockTransfer = require('../__models/MockTransfer');

var _modelsMockTransfer2 = _interopRequireDefault(_modelsMockTransfer);

var watchingTransfers = undefined;

exports['default'] = {
  '/v1/wallets/-address-/transfers': {
    subscribe: {
      up: function up(params, respond) {
        watchingTransfers = params.address;
      }
    },
    update: {
      down: function down() {
        return !watchingTransfers ? null : [_modelsMockTransfer2['default'].fake(watchingTransfers)];
      }
    }
  }
};
module.exports = exports['default'];