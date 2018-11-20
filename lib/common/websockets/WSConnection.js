Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*
 * 
 */

var WSConnection = (function () {
  function WSConnection(url) {
    _classCallCheck(this, WSConnection);

    this.url = url;
    this.subscribers = {};
  }

  _createClass(WSConnection, [{
    key: 'setupStream',
    value: function setupStream(stream) {
      var _this = this;

      this.stream = stream;

      this.stream.onmessage = function (message) {
        var event = JSON.parse(message.data);

        var route = event.route;
        var action = event.action;
        var data = event.data;

        console.log(event);
        _this.trigger(route, action, data);
      };
    }
  }, {
    key: 'trigger',
    value: function trigger(route, action, data) {
      if (this.subscribers[route] && this.subscribers[route][action] && !!data) this.subscribers[route][action].forEach(function (callback) {
        setTimeout(function () {
          return callback(data);
        }, 0);
      });
    }

    //////////////////////
    // Interface Implementation

    /*
     * Establish a connection
     */
  }, {
    key: 'establish',
    value: function establish() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var stream = new WebSocket(_this2.url);

        stream.onerror = function (error) {
          return reject({ status: 'error' });
        };
        stream.onopen = function (open) {
          _this2.setupStream(stream);
          resolve({ status: 'connected' });
        };
      });
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {}
    // TODO: Implement

    /*
     * Add subscribtions 
     * Mainly used to prime subscriptions from a previous connection
     */

  }, {
    key: 'addSubscriptions',
    value: function addSubscriptions(subscribers) {
      this.subscribers = _extends({}, this.subscribers, subscribers);
    }

    /*
     * Get the current subscriptions
     */
  }, {
    key: 'getSubscriptions',
    value: function getSubscriptions() {
      return this.subscribers;
    }

    /*
     * Send an upstream request up to the websocket
     */
  }, {
    key: 'send',
    value: function send(route, action, payload) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        try {
          _this3.stream.send(JSON.stringify({
            route: route,
            action: action,
            data: payload
          }));

          console.log(JSON.stringify({
            route: route,
            action: action,
            data: payload
          }));

          resolve({ status: 'sent' });
        } catch (error) {
          reject(error);
        }
      });
    }

    /*
     * Subscribe to a downstream event from the websocket
     */
  }, {
    key: 'subscribe',
    value: function subscribe(route, action, callback) {
      if (!this.subscribers[route]) this.subscribers[route] = {};
      if (!this.subscribers[route][action]) this.subscribers[route][action] = [];
      this.subscribers[route][action].push(callback);
    }
  }]);

  return WSConnection;
})();

exports['default'] = WSConnection;

WSConnection['interface'] = {
  addSubscriptions: function addSubscriptions() {},
  getSubscriptions: function getSubscriptions() {
    return {};
  },
  establish: function establish(url) {
    return new Promise(function (res, rej) {
      return rej();
    });
  },
  disconnect: function disconnect() {},
  send: function send(route, action, payload) {
    return new Promise(function (res, rej) {
      return rej();
    });
  },
  subscribe: function subscribe(route, action, callback) {}
};
module.exports = exports['default'];