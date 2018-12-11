Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*
 * Info for Token Summaries
 */

var TokenSummary = (function () {
  function TokenSummary(_ref) {
    var ticker = _ref.ticker;
    var name = _ref.name;
    var precision = _ref.precision;
    var display_precision = _ref.display_precision;
    var token_type = _ref.token_type;
    var identifier = _ref.identifier;
    var image_url = _ref.image_url;
    var thumbnail_url = _ref.thumbnail_url;
    var date_added = _ref.date_added;
    var dolomite_token_id = _ref.dolomite_token_id;

    _classCallCheck(this, TokenSummary);

    this.id = dolomite_token_id;
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

  _createClass(TokenSummary, null, [{
    key: 'build',
    value: function build(tokensAsJson) {
      return tokensAsJson.map(function (tokenJson) {
        return new TokenSummary(tokenJson);
      });
    }
  }]);

  return TokenSummary;
})();

exports['default'] = TokenSummary;

TokenSummary.Type = {
  ERC20: 'ERC20'
};

TokenSummary.SortType = {
  ALPHABETICAL: 'ALPHABETICAL',
  HIGHEST_HOLDINGS: 'HIGHEST_HOLDINGS',
  LOWEST_HOLDINGS: 'LOWEST_HOLDINGS',
  HIGHEST_MARKET_CAP: 'HIGHEST_MARKET_CAP',
  LOWEST_MARKET_CAP: 'LOWEST_MARKET_CAP',
  HIGHEST_PRICE: 'HIGHEST_PRICE',
  LOWEST_PRICE: 'LOWEST_PRICE',
  BIGGEST_GAINER: 'BIGGEST_GAINER',
  BIGGEST_LOSER: 'BIGGEST_LOSER'
};

TokenSummary.Types = Object.values(TokenSummary.Type);
TokenSummary.SortTypes = Object.values(TokenSummary.SortType);
module.exports = exports['default'];