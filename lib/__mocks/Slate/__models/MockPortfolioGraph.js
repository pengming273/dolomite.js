Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _globalMocksJs = require('../../_globalMocks.js');

var mock = _interopRequireWildcard(_globalMocksJs);

var _SlateWalletsPeriod = require('../../../Slate/Wallets/Period');

var _SlateWalletsPeriod2 = _interopRequireDefault(_SlateWalletsPeriod);

var periodTime = function periodTime(period) {
  var _Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period;

  return (_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period = {}, _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].ONE_DAY, 24 * 60 * 60 * 1000), _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].ONE_WEEK, 24 * 60 * 60 * 1000 * 7), _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].ONE_MONTH, 24 * 60 * 60 * 1000 * 7 * 30), _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].THREE_MONTH, 24 * 60 * 60 * 1000 * 7 * 30 * 3), _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].SIX_MONTH, 24 * 60 * 60 * 1000 * 7 * 30 * 6), _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].ONE_YEAR, 24 * 60 * 60 * 1000 * 7 * 30 * 12), _defineProperty(_Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period, _SlateWalletsPeriod2['default'].ALL_TIME, 24 * 60 * 60 * 1000 * 7 * 30 * 24), _Period$ONE_DAY$Period$ONE_WEEK$Period$ONE_MONTH$Period$THREE_MONTH$Period$SIX_MONTH$Period$ONE_YEAR$Period$ALL_TIME$period)[period];
};

var fakePoint = function fakePoint(timestamp) {
  return {
    timestamp: timestamp,
    value: "0"
  };
};

var MockPortfolio = (function () {
  function MockPortfolio() {
    _classCallCheck(this, MockPortfolio);
  }

  _createClass(MockPortfolio, null, [{
    key: 'fake',
    value: function fake(period) {
      var count = 250;

      var time = Date.now();
      var timespan = periodTime(period);
      var intervalTime = timespan / count;

      return [].concat(_toConsumableArray(Array(count))).map(function (_, i) {
        var timestamp = time - i * intervalTime;
        return fakePoint(timestamp);
      }).reverse();
    }
  }]);

  return MockPortfolio;
})();

exports['default'] = MockPortfolio;
module.exports = exports['default'];