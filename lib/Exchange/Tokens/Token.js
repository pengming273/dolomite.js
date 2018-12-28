Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*
 * Info for tokens
 */

var Token = (function () {
  function Token(_ref) {
    var ticker = _ref.ticker;
    var name = _ref.name;
    var precision = _ref.precision;
    var display_precision = _ref.display_precision;
    var token_type = _ref.token_type;
    var identifier = _ref.identifier;
    var image_url = _ref.image_url;
    var thumbnail_url = _ref.thumbnail_url;
    var date_added = _ref.date_added;

    _classCallCheck(this, Token);

    this.id = identifier;
    this.ticker = ticker;
    this.name = (name || {}).singular;
    this.namePlural = (name || {}).plural;
    this.precision = precision;
    this.displayPrecision = display_precision;
    this.type = token_type;
    this.imageUrl = image_url;
    this.thumbnailUrl = thumbnail_url;
    this.dateAdded = date_added;

    // Deprecated
    this.decimals = precision;
    this.contractAddress = identifier;
    this.dateAddedToDolomite = date_added;
  }

  /*
   * Different types of tokens/coins
   */

  _createClass(Token, null, [{
    key: 'build',
    value: function build(tokensAsJson) {
      return tokensAsJson.map(function (tokenJson) {
        return new Token(tokenJson);
      });
    }
  }]);

  return Token;
})();

exports['default'] = Token;
Token.Type = {
  ERC20: 'ERC20'
};

Token.Types = Object.values(Token.Type);
module.exports = exports['default'];