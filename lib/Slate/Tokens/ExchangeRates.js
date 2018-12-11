Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rate = function Rate(_ref) {
  var _this = this;

  var quote = _ref.quote;

  _classCallCheck(this, Rate);

  Object.keys(quote).forEach(function (baseTicker) {
    _this[baseTicker] = quote[baseTicker].exchange_rate;
  });
};

var ExchangeRates = (function () {
  function ExchangeRates(rates) {
    var _this2 = this;

    _classCallCheck(this, ExchangeRates);

    Object.keys(rates).forEach(function (ticker) {
      _this2[ticker] = new Rate(rates[ticker]);;
    });
  }

  _createClass(ExchangeRates, [{
    key: "from",
    value: function from(amount, ticker) {
      var _this3 = this;

      var to = function to(baseTicker) {
        var token = _this3[ticker] || {};
        var rate = token[baseTicker];
        if (!rate) return null;
        return rate * amount;
      };

      return { to: to };
    }
  }, {
    key: "fromBase",
    value: function fromBase(amount, baseTicker) {
      var _this4 = this;

      var to = function to(ticker) {
        var token = _this4[ticker] || {};
        var rate = token[baseTicker];
        if (!rate) return null;
        return amount / rate;
      };

      return { to: to };
    }
  }]);

  return ExchangeRates;
})();

exports["default"] = ExchangeRates;
module.exports = exports["default"];