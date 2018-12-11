Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonService = require('../../common/Service');

var _commonService2 = _interopRequireDefault(_commonService);

var _TokenSummary = require('./TokenSummary');

var _TokenSummary2 = _interopRequireDefault(_TokenSummary);

var _TokenDetails = require('./TokenDetails');

var _TokenDetails2 = _interopRequireDefault(_TokenDetails);

var _ExchangeRates = require('./ExchangeRates');

var _ExchangeRates2 = _interopRequireDefault(_ExchangeRates);

var _mocksSlateWalletsHttpJs = require('../../__mocks/Slate/wallets.http.js');

var _mocksSlateWalletsHttpJs2 = _interopRequireDefault(_mocksSlateWalletsHttpJs);

var _mocksSlateWebsocketsWalletsWsJs = require('../../__mocks/Slate/websockets/wallets.ws.js');

var _mocksSlateWebsocketsWalletsWsJs2 = _interopRequireDefault(_mocksSlateWebsocketsWalletsWsJs);

/*
 * Service for the Token resource in the
 * Market API.
 */

var TokenService = (function (_Service) {
  _inherits(TokenService, _Service);

  function TokenService(url, websocket) {
    _classCallCheck(this, TokenService);

    var routes = {
      currencies: {
        get: '/currencies'
      },
      rates: {
        get: '/v1/assets/rates/latest'
      },
      search: {
        get: '/v1/assets/search?token_types=ERC20&token_types=ETH'
      },
      details: {
        get: '/v1/assets/:identifier'
      }
    };

    _get(Object.getPrototypeOf(TokenService.prototype), 'constructor', this).call(this, url, websocket, routes, _mocksSlateWalletsHttpJs2['default'], _mocksSlateWebsocketsWalletsWsJs2['default']);
  }

  _createClass(TokenService, [{
    key: 'getAll',
    value: function getAll() {
      var term = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var sort = arguments.length <= 1 || arguments[1] === undefined ? 'HIGHEST_MARKET_CAP' : arguments[1];
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.pageable('search').build(function (data) {
        return _TokenDetails2['default'].build(data);
      }).get(options, {
        sort_order: sort,
        search_term: term
      });
    }
  }, {
    key: 'getDetails',
    value: function getDetails(identifier) {
      return this.get('details', { identifier: identifier }).then(function (body) {
        return new _TokenDetails2['default'](body.data);
      });
    }
  }, {
    key: 'getExchangeRates',
    value: function getExchangeRates() {
      return this.get('rates').then(function (body) {
        return new _ExchangeRates2['default'](body.data);
      });
    }
  }, {
    key: 'watchExchangeRates',
    value: function watchExchangeRates() {
      return this.send('/v1/assets/rates/latest', 'subscribe');
    }
  }, {
    key: 'onExchangeRatesUpdate',
    value: function onExchangeRatesUpdate(callback) {
      return this.on('/v1/assets/rates/latest', 'update').then(callback);
    }
  }]);

  return TokenService;
})(_commonService2['default']);

exports['default'] = TokenService;

TokenService.exports = {
  Token: _TokenSummary2['default']
};
module.exports = exports['default'];