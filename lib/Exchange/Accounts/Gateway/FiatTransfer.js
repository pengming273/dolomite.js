"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SRN = _interopRequireDefault(require("./SRN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rounded = function rounded(n) {
  return n && parseFloat(n.toFixed(5));
};

var toHistory = function toHistory(history) {
  return history.map(function (item) {
    return item;
  });
};

var FiatTransfer =
/*#__PURE__*/
function () {
  function FiatTransfer(_ref) {
    var identifier = _ref.identifier,
        fee_amounts = _ref.fee_amounts,
        total_fee_amount = _ref.total_fee_amount,
        transfer_gateway_status = _ref.transfer_gateway_status,
        source = _ref.source,
        destination = _ref.destination,
        creation_timestamp = _ref.creation_timestamp,
        completed_timestamp = _ref.completed_timestamp,
        cancelled_timestamp = _ref.cancelled_timestamp,
        expiration_timestamp = _ref.expiration_timestamp,
        status_history = _ref.status_history,
        source_ticker = _ref.source_ticker,
        source_amount = _ref.source_amount,
        destination_ticker = _ref.destination_ticker,
        destination_amount = _ref.destination_amount,
        exchange_rate = _ref.exchange_rate;

    _classCallCheck(this, FiatTransfer);

    this.id = identifier;
    this.fees = fee_amounts || {};
    this.feeTotal = rounded(total_fee_amount);
    this.status = transfer_gateway_status;
    this.source = new _SRN["default"](source);
    this.sourceTicker = source_ticker;
    this.sourceAmount = source_amount;
    this.destination = new _SRN["default"](destination);
    this.destinationTicker = destination_ticker;
    this.destinationAmount = rounded(destination_amount);
    this.exchangeRate = rounded(exchange_rate);
    this.reverseExchangeRate = rounded(1 / exchange_rate);
    this.history = toHistory(status_history);
    this.createdAt = new Date(creation_timestamp);
    this.cancelledAt = cancelled_timestamp && new Date(cancelled_timestamp);
    this.expiredAt = expiration_timestamp && new Date(expiration_timestamp);
    this.completedAt = completed_timestamp && new Date(completed_timestamp);
  }

  _createClass(FiatTransfer, null, [{
    key: "build",
    value: function build(transfersJson) {
      return transfersJson.map(function (transfer) {
        return new FiatTransfer(transfer);
      });
    }
  }]);

  return FiatTransfer;
}();

var _default = FiatTransfer;
exports["default"] = _default;