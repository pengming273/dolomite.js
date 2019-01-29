Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Wrap a conventional HTTP/S get request into
 * a websocket esque interface.
 */

var WSWrapper = (function () {
  function WSWrapper(requestCallback) {
    var _this = this;

    var interval = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

    _classCallCheck(this, WSWrapper);

    this.requestCallback = requestCallback;
    this.subscribers = [];

    if (interval > 0) setInterval(function () {
      return _this.trigger();
    }, interval * 1000);
  }

  _createClass(WSWrapper, [{
    key: "trigger",
    value: function trigger() {
      var response = this.requestCallback();
      if (response) this.resolve(response);
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
  }, {
    key: "resolve",
    value: function resolve(promise) {
      var _this2 = this;

      promise.then(function (data) {
        _this2.subscribers.forEach(function (callback) {
          return callback(data);
        });
      });
    }
  }]);

  return WSWrapper;
})();

exports["default"] = WSWrapper;
module.exports = exports["default"];