Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var BigNumber = (function () {
  function BigNumber(_ref) {
    var amount = _ref.amount;
    var currency = _ref.currency;

    _classCallCheck(this, BigNumber);

    this.raw = { amount: amount, currency: currency };
    this.value = amount;
    this.currency = {
      ticker: currency.ticker,
      precision: currency.precision,
      displayPrecision: currency.display_precision
    };
    this.precision = this.currency.precision;
    this.amount = this.value / Math.pow(10, this.precision);
  }

  _createClass(BigNumber, [{
    key: 'modify',
    value: function modify(callback) {
      this.value = callback(this.value);
      this.amount = this.value / Math.pow(10, this.precision);
    }
  }, {
    key: 'dup',
    get: function get() {
      return new BigNumber(this.raw);
    }
  }], [{
    key: 'build',
    value: function build(value, precision) {
      var ticker = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

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
    key: 'fromFloat',
    value: function fromFloat(number) {
      var ticker = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var num = parseFloat(number);
      var fractional = num.toString().split('.')[1];
      var decimals = fractional ? fractional.length : 0;
      var amount = num * Math.pow(10, decimals);
      return BigNumber.build(amount, decimals, ticker);
    }
  }]);

  return BigNumber;
})();

exports['default'] = BigNumber;
module.exports = exports['default'];