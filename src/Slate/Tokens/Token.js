/*
 * Info for tokens
 */

export default class Token {
    constructor({ticker, name, precision, display_precision, token_type, identifier,
                    image_url, thumbnail_url, date_added}) {
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

    static build(tokensAsJson) {
        return tokensAsJson.map(tokenJson => new Token(tokenJson));
    }
}

/*
 * Different types of tokens/coins
 */
Token.Type = {
    ERC20: 'ERC20'
}

Token.SortType = {
    ALPHABETICAL: 'ALPHABETICAL',
    HIGHEST_HOLDINGS: 'HIGHEST_HOLDINGS',
    LOWEST_HOLDINGS: 'LOWEST_HOLDINGS',
    HIGHEST_MARKET_CAP: 'HIGHEST_MARKET_CAP',
    LOWEST_MARKET_CAP: 'LOWEST_MARKET_CAP',
    HIGHEST_PRICE: 'HIGHEST_PRICE',
    LOWEST_PRICE: 'LOWEST_PRICE',
    BIGGEST_GAINER: 'BIGGEST_GAINER',
    BIGGEST_LOSER: 'BIGGEST_LOSER',
}

Token.Types = Object.values(Token.Type);
