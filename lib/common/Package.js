Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = (function () {
  function Package(_ref) {
    var _this = this;

    var url = _ref.url;
    var websocketUrl = _ref.websocketUrl;
    var services = _ref.services;

    _classCallCheck(this, Package);

    var serviceNames = Object.keys(services);
    serviceNames.forEach(function (name) {
      var ServiceType = services[name];
      _this[name] = new ServiceType(url);
    });
    this.services = serviceNames.map(function (name) {
      return _this[name];
    });
  }

  _createClass(Package, [{
    key: "configure",
    value: function configure(_ref2) {
      var apiKey = _ref2.apiKey;
      var mockDelay = _ref2.mockDelay;
      var shouldMock = _ref2.shouldMock;

      if (apiKey) this.services.forEach(function (service) {
        return service.configure(apiKey);
      });else if (mockDelay != null || shouldMock != null) this.services.forEach(function (service) {
        return service.configureOptions({ mockDelay: mockDelay, shouldMock: shouldMock });
      });
    }
  }]);

  return Package;
})();

exports["default"] = Package;
module.exports = exports["default"];