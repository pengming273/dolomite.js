Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _commonBigNumber = require('../../common/BigNumber');

var _commonBigNumber2 = _interopRequireDefault(_commonBigNumber);

var _TokenSummary = require('./TokenSummary');

var _TokenSummary2 = _interopRequireDefault(_TokenSummary);

var TokenSiteInfo = function TokenSiteInfo(_ref) {
  var discord_url = _ref.discord_url;
  var git_hub_url = _ref.git_hub_url;
  var facebook_url = _ref.facebook_url;
  var medium_url = _ref.medium_url;
  var reddit_url = _ref.reddit_url;
  var telegram_url = _ref.telegram_url;
  var twitter_url = _ref.twitter_url;
  var website_url = _ref.website_url;

  _classCallCheck(this, TokenSiteInfo);

  this.discord = discord_url;
  this.github = git_hub_url;
  this.facebook = facebook_url;
  this.medium = medium_url;
  this.reddit = reddit_url;
  this.telegram = telegram_url;
  this.twitter = twitter_url;
  this.website = website_url;
};

var TokenIssuanceInfo = function TokenIssuanceInfo(_ref2) {
  var price_crypto = _ref2.price_crypto;
  var price_usd = _ref2.price_usd;
  var start_date = _ref2.start_date;
  var end_date = _ref2.end_date;
  var had_pre_sale = _ref2.had_pre_sale;

  _classCallCheck(this, TokenIssuanceInfo);

  this.price = new _commonBigNumber2['default'](price_crypto);
  this.priceUsd = new _commonBigNumber2['default'](price_usd);
  this.start = start_date && new Date(start_date);
  this.end = end_date && new Date(end_date);
  this.hadPreSale = had_pre_sale;
};

var TokenMarketInfo = function TokenMarketInfo(_ref3) {
  var one_day_high_usd = _ref3.one_day_high_usd;
  var one_day_low_usd = _ref3.one_day_low_usd;
  var one_day_volume_usd = _ref3.one_day_volume_usd;
  var one_day_percentage_change = _ref3.one_day_percentage_change;
  var one_month_average_volume_usd = _ref3.one_month_average_volume_usd;
  var market_capitalization_usd = _ref3.market_capitalization_usd;
  var circulating_supply = _ref3.circulating_supply;
  var max_supply = _ref3.max_supply;

  _classCallCheck(this, TokenMarketInfo);

  this.oneDayHighUsd = new _commonBigNumber2['default'](one_day_high_usd);
  this.oneDayLowUsd = new _commonBigNumber2['default'](one_day_low_usd);
  this.oneDayVolumeUsd = new _commonBigNumber2['default'](one_day_volume_usd);
  this.oneDayPercentageChange = one_day_percentage_change;
  this.oneMonthAverageVolumeUsd = new _commonBigNumber2['default'](one_month_average_volume_usd);
  this.marketCapitalizationUsd = new _commonBigNumber2['default'](market_capitalization_usd);
  this.circulatingSupply = new _commonBigNumber2['default'](circulating_supply);
  this.maxSupply = new _commonBigNumber2['default'](max_supply);
}

/*
 * Token Details object. All fields are optional.
 */
;

var TokenDetails = (function () {
  function TokenDetails(_ref4) {
    var token_summary = _ref4.token_summary;
    var token_external_site_info = _ref4.token_external_site_info;
    var token_description = _ref4.token_description;
    var token_issuance_info = _ref4.token_issuance_info;
    var token_market_info = _ref4.token_market_info;

    _classCallCheck(this, TokenDetails);

    this.summary = token_summary && new _TokenSummary2['default'](token_summary);
    this.siteInfo = token_external_site_info && new TokenSiteInfo(token_external_site_info);
    this.description = token_description;
    this.issuanceInfo = token_issuance_info && new TokenIssuanceInfo(token_issuance_info);
    this.marketInfo = token_market_info && new TokenMarketInfo(token_market_info);
  }

  _createClass(TokenDetails, null, [{
    key: 'build',
    value: function build(tokensAsJson) {
      return tokensAsJson.map(function (tokenJson) {
        return new TokenDetails(tokenJson);
      });
    }
  }]);

  return TokenDetails;
})();

exports['default'] = TokenDetails;
module.exports = exports['default'];