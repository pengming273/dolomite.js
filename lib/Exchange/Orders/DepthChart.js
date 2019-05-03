"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OrderDepth = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Volume (Depth) of sell or buy orders at a price
 */
var OrderDepth =
/*#__PURE__*/
function () {
  function OrderDepth(_ref) {
    var primary_amount = _ref.primary_amount,
        secondary_amount = _ref.secondary_amount,
        amount_usd = _ref.amount_usd,
        exchange_rate = _ref.exchange_rate;

    _classCallCheck(this, OrderDepth);

    this.quantity = new _BigNumber["default"](primary_amount);
    this.total = new _BigNumber["default"](secondary_amount);
    this.totalUsd = amount_usd && new _BigNumber["default"](amount_usd); // const price = this.total.amount / this.quantity.amount;

    this.price = _BigNumber["default"].fromFloat(exchange_rate);
  }

  _createClass(OrderDepth, null, [{
    key: "build",
    value: function build(depthArray) {
      return depthArray.map(function (depthJson) {
        return new OrderDepth(depthJson);
      });
    }
  }]);

  return OrderDepth;
}();
/*
 * Holds the OrderDepths for buy and sell orders
 */


exports.OrderDepth = OrderDepth;

var OrderDepthChart =
/*#__PURE__*/
function () {
  function OrderDepthChart(pair, buys, sells) {
    _classCallCheck(this, OrderDepthChart);

    this.marketPair = pair;
    this.buyDepths = buys;
    this.sellDepths = sells;
  }

  _createClass(OrderDepthChart, null, [{
    key: "build",
    value: function build(_ref2) {
      var market = _ref2.market,
          buys = _ref2.buys,
          sells = _ref2.sells;
      var buyDepths = OrderDepth.build(buys);
      var sellDepths = OrderDepth.build(sells);
      return new OrderDepthChart(market, buyDepths, sellDepths);
    }
  }]);

  return OrderDepthChart;
}();

exports["default"] = OrderDepthChart;