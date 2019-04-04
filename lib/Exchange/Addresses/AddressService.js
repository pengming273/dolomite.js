"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _WSWrapper = _interopRequireDefault(require("../../common/websockets/WSWrapper"));

var _Account = _interopRequireDefault(require("../Accounts/Account"));

var _Balance = _interopRequireWildcard(require("./Balance"));

var _Order = _interopRequireDefault(require("../Orders/Order"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AddressService =
/*#__PURE__*/
function (_Service) {
  _inherits(AddressService, _Service);

  function AddressService() {
    _classCallCheck(this, AddressService);

    return _possibleConstructorReturn(this, _getPrototypeOf(AddressService).apply(this, arguments));
  }

  _createClass(AddressService, [{
    key: "getPortfolio",
    /////////////////////////
    // ----------------------------------------------
    // Portfolio
    value: function getPortfolio(address) {
      return this.get('portfolio', {
        address: address
      }).then(function (body) {
        return _Balance["default"].hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "watchPortfolio",
    value: function watchPortfolio(address) {
      this.watchAddress = address;
    }
  }, {
    key: "onPortfolioUpdate",
    value: function onPortfolioUpdate(callback) {
      var _this = this;

      if (!this.portfolioWS) this.portfolioWS = new _WSWrapper["default"](function () {
        if (!_this.watchAddress) return null;
        return _this.getPortfolio(_this.watchAddress);
      }, 15); // update balances every 15s

      this.portfolioWS.subscribe(callback);
    } // ----------------------------------------------
    // Balance Info (contains committed/approved amounts)

  }, {
    key: "getBalanceInfo",
    value: function getBalanceInfo(address, tickers) {
      var payload = {
        address: address
      };
      if (tickers) payload.tickers = tickers;
      return this.get('balanceInfo', payload).then(function (body) {
        return _Balance.BalanceInfo.hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "onBalanceInfoUpdate",
    value: function onBalanceInfoUpdate(callback) {
      var _this2 = this;

      if (!this.balanceInfoWS) this.balanceInfoWS = new _WSWrapper["default"](function () {
        if (!_this2.watchAddress) return null;
        return _this2.getBalanceInfo(_this2.watchAddress);
      }, 15); // update balance infos every 15s

      this.balanceInfoWS.subscribe(callback);
    } // ----------------------------------------------
    // Account

  }, {
    key: "getAccount",
    value: function getAccount(address) {
      return this.get('info', {
        address: address
      }).then(function (body) {
        return new _Account["default"](body.data);
      });
    }
  }, {
    key: "onAccountUpdate",
    value: function onAccountUpdate(callback) {
      var _this3 = this;

      if (!this.accountInfoWS) this.accountInfoWS = new _WSWrapper["default"](function () {
        if (!_this3.watchAddress) return null;
        return _this3.getAccount(_this3.watchAddress)["catch"](function () {
          return {};
        });
      }, 15); // update account infos every 15s

      this.accountInfoWS.subscribe(callback); // return this.on('/v1/addresses/-address-/info', 'update')
      //   .build(data => new Account(data))
      //   .then(callback)
    } // ----------------------------------------------
    // Orders

  }, {
    key: "getOrders",
    value: function getOrders(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.get('orders', _objectSpread({
        address: address
      }, options)).then(function (body) {
        return _Order["default"].hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "watch",
    value: function watch(address) {
      this.watchAddress = address;
      return Promise.all([this.send('/v1/watch-wallet', 'subscribe', {
        address: address
      }), this.send('/v1/addresses/-address-/info', 'subscribe', {
        address: address
      })]);
    }
  }, {
    key: "onOrdersUpdate",
    value: function onOrdersUpdate(callback) {
      this.on('/v1/orders/addresses/-address-', 'update').build(function (data) {
        return _Order["default"].build(data);
      }).then(callback);
    }
  }, {
    key: "onOrdersFillingUpdate",
    value: function onOrdersFillingUpdate(callback) {
      this.on('/v1/orders/addresses/-address-/fills', 'update').build(function (data) {
        return _Order["default"].build(data);
      }).then(callback);
    }
  }]);

  return AddressService;
}(_Service2["default"]);

exports["default"] = AddressService;

_defineProperty(AddressService, "routes", {
  portfolio: {
    get: '/v1/addresses/:address/balances-deprecated'
  },
  info: {
    get: '/v1/addresses/:address/info'
  },
  orders: {
    get: '/v1/orders/addresses/:address'
  },
  balanceInfo: {
    get: '/v1/addresses/:address/portfolio'
  }
});

_defineProperty(AddressService, "exports", {
  Balance: _Balance["default"],
  BalanceInfo: _Balance.BalanceInfo
});