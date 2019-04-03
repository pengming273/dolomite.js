"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Used for numbers provided by the API in the format:
 * {
 *   amount: <int>
 *   currency: {
 *     ticker: <string>,
 *     precision: <int>,
 *     display_precision: <int>
 *   }
 * }
 */
var BigNumber =
/*#__PURE__*/
function () {
  function BigNumber(raw) {
    _classCallCheck(this, BigNumber);

    if (raw) {
      var amount = raw.amount;
      var currency = raw.currency;
      this.raw = {
        amount: amount,
        currency: currency
      };
      this.value = amount;
      this.currency = {
        ticker: currency.ticker,
        precision: currency.precision,
        displayPrecision: currency.display_precision
      };
      this.precision = this.currency.precision;
      this.amount = this.value / Math.pow(10, this.precision);
    }
  }

  _createClass(BigNumber, [{
    key: "modify",
    value: function modify(callback) {
      this.value = callback(this.value);
      this.amount = this.value / Math.pow(10, this.precision);
    }
  }, {
    key: "dup",
    get: function get() {
      return new BigNumber(this.raw);
    }
  }], [{
    key: "build",
    value: function build(value, precision) {
      var ticker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new BigNumber({
        amount: value,
        currency: {
          precision: precision,
          display_precision: precision,
          ticker: ticker
        }
      });
    }
  }, {
    key: "fromFloat",
    value: function fromFloat(number) {
      var ticker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var num = parseFloat(number);
      var fractional = num.toString().split('.')[1];
      var decimals = fractional ? fractional.length : 0;
      var amount = num * Math.pow(10, decimals);
      return BigNumber.build(amount, decimals, ticker);
    }
  }]);

  return BigNumber;
}();

exports["default"] = BigNumber;