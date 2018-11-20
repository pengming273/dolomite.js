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

var _Portfolio = require('./Portfolio');

var _Portfolio2 = _interopRequireDefault(_Portfolio);

var _Holding = require('./Holding');

var _Holding2 = _interopRequireDefault(_Holding);

var _commonWebsocketsWSWrapper = require('../../common/websockets/WSWrapper');

var _commonWebsocketsWSWrapper2 = _interopRequireDefault(_commonWebsocketsWSWrapper);

var _mocksSlateWalletsHttpJs = require('../../__mocks/Slate/wallets.http.js');

var _mocksSlateWalletsHttpJs2 = _interopRequireDefault(_mocksSlateWalletsHttpJs);

var _mocksSlateWebsocketsWalletsWsJs = require('../../__mocks/Slate/websockets/wallets.ws.js');

var _mocksSlateWebsocketsWalletsWsJs2 = _interopRequireDefault(_mocksSlateWebsocketsWalletsWsJs);

var WalletService = (function (_Service) {
  _inherits(WalletService, _Service);

  function WalletService(url) {
    _classCallCheck(this, WalletService);

    var routes = {
      portfolio: {
        get: '/v1/wallets/:address/portfolio-info'
      },
      holdings: {
        get: '/v1/wallets/:address/holding-info'
      }
    };

    _get(Object.getPrototypeOf(WalletService.prototype), 'constructor', this).call(this, url, routes, _mocksSlateWalletsHttpJs2['default'], _mocksSlateWebsocketsWalletsWsJs2['default']);
  }

  _createClass(WalletService, [{
    key: 'getPortfolio',
    value: function getPortfolio(address) {
      return this.get('portfolio', { address: address }).then(function (body) {
        return new _Portfolio2['default'](body.data);
      });
    }
  }, {
    key: 'getHoldings',
    value: function getHoldings(address, options) {
      return this.pageable('holdings').build(function (data) {
        return _Holding2['default'].build(data);
      }).get({ address: address, options: options });
    }
  }, {
    key: 'watch',
    value: function watch(address) {
      this.watchedAddress = address;
    }
  }, {
    key: 'onPortfolioUpdate',
    value: function onPortfolioUpdate(callback) {
      var _this = this;

      if (!this.portfolioWS) {
        var updateInterval = 15; // seconds TODO: change

        this.portfolioWS = new _commonWebsocketsWSWrapper2['default'](function () {
          if (!_this.watchedAddress) return null;
          return _this.getPortfolio(_this.watchedAddress);
        }, updateInterval);
      }

      this.portfolioWS.subscribe(callback);
    }
  }, {
    key: 'onHoldingsUpdate',
    value: function onHoldingsUpdate(callback) {
      var _this2 = this;

      if (!this.holdingsWS) {
        var updateInterval = 15; // seconds TODO: change

        this.holdingsWS = new _commonWebsocketsWSWrapper2['default'](function () {
          if (!_this2.watchedAddress) return null;
          return _this2.getHoldings(_this2.watchedAddress);
        }, updateInterval);
      }

      this.holdingsWS.subscribe(callback);
    }
  }]);

  return WalletService;
})(_commonService2['default']);

exports['default'] = WalletService;
module.exports = exports['default'];