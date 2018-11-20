Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonBigNumber = require('../../common/BigNumber');

var _commonBigNumber2 = _interopRequireDefault(_commonBigNumber);

var _TokensTokenSummary = require('../Tokens/TokenSummary');

var _TokensTokenSummary2 = _interopRequireDefault(_TokensTokenSummary);

var toPercent = function toPercent(p) {
  return parseFloat(((p || 0) * 100).toFixed(2));
};

/*
 * Holding object
 */

var Holding = (function () {
  function Holding(_ref) {
    var owner_address = _ref.owner_address;
    var token_summary = _ref.token_summary;
    var balance = _ref.balance;
    var current_value = _ref.current_value;
    var amount_change_value = _ref.amount_change_value;
    var percentage_change_value = _ref.percentage_change_value;

    _classCallCheck(this, Holding);

    this.address = owner_address;
    this.token = new _TokensTokenSummary2['default'](token_summary);
    this.balance = new _commonBigNumber2['default'](balance);
    this.currentValue = new _commonBigNumber2['default'](current_value);
    this.amountChange = new _commonBigNumber2['default'](amount_change_value);
    this.percentChange = toPercent(percentage_change_value);
  }

  _createClass(Holding, null, [{
    key: 'build',
    value: function build(holdingJsonArray) {
      return holdingJsonArray.map(function (holdingJson) {
        return new Holding(holdingJson);
      });
    }
  }]);

  return Holding;
})();

exports['default'] = Holding;
module.exports = exports['default'];