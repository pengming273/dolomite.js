"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthService2 = _interopRequireDefault(require("../../../common/AuthService"));

var _PaymentMethod = _interopRequireDefault(require("./PaymentMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VerificationService =
/*#__PURE__*/
function (_AuthService) {
  _inherits(VerificationService, _AuthService);

  function VerificationService() {
    _classCallCheck(this, VerificationService);

    return _possibleConstructorReturn(this, _getPrototypeOf(VerificationService).apply(this, arguments));
  }

  _createClass(VerificationService, [{
    key: "getPaymentMethods",
    /////////////////////////
    // ----------------------------------------------
    // Payment Methods
    value: function getPaymentMethods(accountId) {
      return this.requiresAuth.get('paymentMethods', {
        account_id: accountId
      }).then(function (body) {
        return _PaymentMethod["default"].build(body.data);
      });
    }
  }]);

  return VerificationService;
}(_AuthService2["default"]);

exports["default"] = VerificationService;

_defineProperty(VerificationService, "routes", {
  paymentMethods: {
    get: '/v1/accounts/:account_id/gateway/payment-methods'
  }
});

_defineProperty(VerificationService, "exports", {
  PaymentMethod: _PaymentMethod["default"] // FiatTransfer

});