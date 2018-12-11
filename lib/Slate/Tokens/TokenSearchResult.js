// import BigNumber from '../../common/BigNumber';
// import TokenSummary from './TokenSummary';

// class TokenMarketInfo {
//   constructor({ one_day_high_usd, one_day_low_usd, one_day_volume_usd, one_day_percentage_change,
//     one_month_average_volume_usd, market_capitalization_usd, circulating_supply, max_supply }) {

//     this.oneDayHighUsd = new BigNumber(one_day_high_usd);
//     this.oneDayLowUsd = new BigNumber(one_day_low_usd);
//     this.oneDayVolumeUsd = new BigNumber(one_day_volume_usd);
//     this.oneDayPercentageChange = one_day_percentage_change;
//     this.oneMonthAverageVolumeUsd = new BigNumber(one_month_average_volume_usd);
//     this.marketCapitalizationUsd = new BigNumber(market_capitalization_usd);
//     this.circulatingSupply = new BigNumber(circulating_supply);
//     this.maxSupply = new BigNumber(max_supply);
//   }
// }

// /*
//  * Token Search Result
//  */
// export default class TokenSearchResult {
//   constructor({token_summary, token_market_info}) {
//     this.summary = new TokenSummary(token_summary);
//     this.marketInfo = new TokenMarketInfo(token_market_info);
//   }

//   static build(tokensAsJson) {
//     return tokensAsJson.map(tokenJson => new TokenSearchResult(tokenJson));
//   }
// }