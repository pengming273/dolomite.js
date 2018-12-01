Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _randexp = require('randexp');

var _randexp2 = _interopRequireDefault(_randexp);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

/*
 * Commonly used helper functions
 */
var sample = function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
};
exports.sample = sample;
var normalizeNumber = function normalizeNumber(num) {
  var ticker = arguments.length <= 1 || arguments[1] === undefined ? "ETH" : arguments[1];
  return Number(parseFloat(num.toFixed(6)), ticker);
};
exports.normalizeNumber = normalizeNumber;
var transactionHash = function transactionHash() {
  return new _randexp2['default'](/^0x([A-Fa-f0-9]{64})$/).gen();
};
exports.transactionHash = transactionHash;
var address = function address() {
  return new _randexp2['default'](/^0x[a-fA-F0-9]{40}$/).gen();
};
exports.address = address;
var randomRounded = function randomRounded(num, p) {
  var c = arguments.length <= 2 || arguments[2] === undefined ? 0.05 : arguments[2];
  return parseFloat((num + Math.random() * 0.05 * num).toFixed(p));
};
exports.randomRounded = randomRounded;
var randomChange = function randomChange(num) {
  var c = arguments.length <= 1 || arguments[1] === undefined ? 0.05 : arguments[1];
  return randomRounded(num, 5, c);
};
exports.randomChange = randomChange;
var uuid = _uuid2['default'];

exports.uuid = uuid;
/*
 * Create a Paged response
 */
var Paged = function Paged(callback) {
  return function (path, request) {
    var params = JSON.parse(request.body);

    var page_size = params.page_size || 50;
    var current_page = params.page_number || 0;

    var page = callback(path, request, params);

    var array = page.data;
    var startIndex = current_page * page_size;
    var subArray = array.slice(startIndex, startIndex + page_size);

    page.data = subArray;

    return _extends({
      paging_metadata: {
        page_number: current_page,
        page_size: page_size,
        sort_order: params.sort_order
      }
    }, page);
  };
};

exports.Paged = Paged;
/*
 * Extract url params from url given a target with :named params
 *
 * Example: 
 * paramsFrom('/path/1/hello', '/path/:a/:b') => { a: '1', b: 'hello' }
 */
var paramsFrom = function paramsFrom(url, target) {
  var path = new URL(url).pathname;
  var values = path.split('/');
  var params = target.split('/').map(function (p) {
    return p.startsWith(':') ? p : null;
  });
  var extracted = {};
  for (var i = 0; i < params.length; i++) {
    if (params[i]) {
      if (values[i] !== params[i]) extracted[params[i].substring(1)] = values[i];
    }
  }
  return extracted;
};

exports.paramsFrom = paramsFrom;
/*
 * All large numbers are formatted with a `value` integer and
 * a `precision` that represents the number of decimal places.
 * This converts an int/double to the correct format
 */
var Number = function Number(number) {
  var ticker = arguments.length <= 1 || arguments[1] === undefined ? "ETH" : arguments[1];

  var fractional = number.toString().split('.')[1];
  var decimals = fractional ? fractional.length : 0;
  return {
    amount: number * Math.pow(10, decimals),
    currency: {
      ticker: ticker,
      precision: decimals,
      display_precision: 5
    }
  };
};

exports.Number = Number;
var NumberAround = function NumberAround(number) {
  var ticker = arguments.length <= 1 || arguments[1] === undefined ? 'ETH' : arguments[1];
  var rounded = arguments.length <= 2 || arguments[2] === undefined ? 8 : arguments[2];

  return Number(randomRounded(number, rounded), ticker);
};

exports.NumberAround = NumberAround;
var fromEth = function fromEth(amount, ticker) {
  return (({
    ETH: 1,
    WETH: 1,
    LRC: 2500,
    APPC: 3500,
    BAT: 1000,
    BNB: 1000,
    OMG: 1000,
    MKR: 1000,
    WTC: 1000,
    USD: 200
  })[ticker] || 0) * amount;
};
exports.fromEth = fromEth;