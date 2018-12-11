import Token from './Token.js';


const toCurrency = ({ticker, precision, display_precision}) => ({
    ticker: ticker,
    precision: precision,
    displayPrecision: display_precision
});

const toCurrencyObject = ({amount, currency}) => ({
    amount: amount,
    currency: toCurrency(currency || {})
});

const toTokenMarketInfo = ({one_day_high_usd, one_day_low_usd, one_day_volume_usd, one_day_percentage_change, one_month_average_volume_usd, market_capitalization_usd, circulating_supply, max_supply}) => ({
    oneDayHighUsd: toCurrencyObject(one_day_high_usd || {}),
    oneDayLowUsd: toCurrencyObject(one_day_low_usd || {}),
    oneDayVolumeUsd: toCurrencyObject(one_day_volume_usd || {}),
    oneDayPercentageChange: one_day_percentage_change || 0,
    oneMonthAverageVolumeUsd: toCurrencyObject(one_month_average_volume_usd || {}),
    marketCapitalizationUsd: toCurrencyObject(market_capitalization_usd || {}),
    circulatingSupply: toCurrencyObject(circulating_supply || {}),
    maxSupply: max_supply || 0,
});

/*
 * Token Search Result
 */

export default class TokenSearchResult {
    constructor({token_summary, token_market_info}) {
        this.tokenSummary = new Token(token_summary);
        this.tokenMarketInfo = toTokenMarketInfo(token_market_info);
    }

    static build(tokensAsJson) {
        return tokensAsJson.map(tokenJson => new TokenSearchResult(tokenJson));
    }
}

/*
 * Different types of tokens/coins
 */
Token.Type = {
    ERC20: 'ERC20'
}

Token.Types = Object.values(Token.Type);
