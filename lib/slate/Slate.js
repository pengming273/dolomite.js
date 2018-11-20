Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonPackage = require('../common/Package');

var _commonPackage2 = _interopRequireDefault(_commonPackage);

var _WalletsWalletService = require('./Wallets/WalletService');

var _WalletsWalletService2 = _interopRequireDefault(_WalletsWalletService);

var _ActivityActivityService = require('./Activity/ActivityService');

var _ActivityActivityService2 = _interopRequireDefault(_ActivityActivityService);

var SLATE_API_URL = 'https://exchange-api.dolomite.io';
var SLATE_WEBSOCKET_URL = 'wss://exchange-api.dolomite.io/ws-connect';

/*
 * 
 */

var Slate = (function (_Package) {
  _inherits(Slate, _Package);

  function Slate() {
    _classCallCheck(this, Slate);

    _get(Object.getPrototypeOf(Slate.prototype), 'constructor', this).call(this, {
      url: SLATE_API_URL,
      services: {
        wallets: _WalletsWalletService2['default'],
        activity: _ActivityActivityService2['default']
      }
    });
  }

  return Slate;
})(_commonPackage2['default']);

exports['default'] = Slate;
module.exports = exports['default'];