Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonService = require('../../common/Service');

var _commonService2 = _interopRequireDefault(_commonService);

var _Transfer = require('./Transfer');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _mocksSlateActivityHttpJs = require('../../__mocks/Slate/activity.http.js');

var _mocksSlateActivityHttpJs2 = _interopRequireDefault(_mocksSlateActivityHttpJs);

var _mocksSlateWebsocketsActivityWsJs = require('../../__mocks/Slate/websockets/activity.ws.js');

var _mocksSlateWebsocketsActivityWsJs2 = _interopRequireDefault(_mocksSlateWebsocketsActivityWsJs);

var ActivityService = (function (_Service) {
  _inherits(ActivityService, _Service);

  function ActivityService(url) {
    _classCallCheck(this, ActivityService);

    var routes = {
      transfers: {
        get: '/v1/wallets/:address/transfers'
      }
    };

    _get(Object.getPrototypeOf(ActivityService.prototype), 'constructor', this).call(this, url, routes, _mocksSlateActivityHttpJs2['default'], _mocksSlateWebsocketsActivityWsJs2['default']);
  }

  _createClass(ActivityService, [{
    key: 'getTransfers',
    value: function getTransfers(address, options) {
      return this.pageable('transfers').build(function (data) {
        return _Transfer2['default'].build(data);
      }).get({ address: address, options: options });
    }
  }, {
    key: 'watchTransfers',
    value: function watchTransfers(address) {
      return this.send('/v1/wallets/-address-/transfers', 'subscribe', {
        address: address
      });
    }
  }, {
    key: 'onTransferUpdate',
    value: function onTransferUpdate(callback) {
      this.on('/v1/wallets/-address-/transfers', 'update').build(function (data) {
        return _Transfer2['default'].build(data);
      }).then(callback);
    }
  }]);

  return ActivityService;
})(_commonService2['default']);

exports['default'] = ActivityService;
module.exports = exports['default'];