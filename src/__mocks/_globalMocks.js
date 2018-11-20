import RandExp from 'randexp';
import uuid from 'uuid';

/*
 * Commonly used helper functions
 */
export const sample = (array) => array[Math.floor(Math.random()*array.length)];
export const normalizeNumber = (num, ticker="ETH") => Number(parseFloat(num.toFixed(6)), ticker);
export const transactionHash = () => new RandExp(/^0x([A-Fa-f0-9]{64})$/).gen();
export const address = () => new RandExp(/^0x[a-fA-F0-9]{40}$/).gen();
export const randomRounded = (num, p, c = 0.05) => parseFloat((num + (Math.random() * 0.05 * num)).toFixed(p));
export const randomChange = (num, c = 0.05) => randomRounded(num, 5, c);

/*
 * Create a Paged response
 */
export const Paged = (callback) => (path, request) => {
  const params = JSON.parse(request.body);

  const page_size = params.page_size || 50;
  const current_page = params.page_number || 0;

  const page = callback(path, request, params);

  const array = page.data;
  const startIndex = current_page * page_size;
  const subArray = array.slice(startIndex, startIndex + page_size)

  page.data = subArray;

  return {
    paging_metadata: {
      page_number: current_page,
      page_size: page_size,
      sort_order: params.sort_order
    },
    ...page
  };
};

/*
 * Extract url params from url given a target with :named params
 *
 * Example: 
 * paramsFrom('/path/1/hello', '/path/:a/:b') => { a: '1', b: 'hello' }
 */
export const paramsFrom = (url, target) => {
  const path = (new URL(url)).pathname;
  const values = path.split('/');
  const params = target.split('/').map(p => p.startsWith(':') ? p : null);
  const extracted = {};
  for (var i = 0; i < params.length; i++) {
    if (params[i]) {
      if (values[i] !== params[i])
        extracted[params[i].substring(1)] = values[i];
    }
  }
  return extracted;
};

/*
 * All large numbers are formatted with a `value` integer and
 * a `precision` that represents the number of decimal places.
 * This converts an int/double to the correct format
 */
export const Number = (number, ticker = "ETH") => {
  const fractional = number.toString().split('.')[1];
  const decimals = fractional ? fractional.length : 0;
  return {
    amount: number * Math.pow(10, decimals),
    currency: {
      ticker: ticker,
      precision: decimals,
      display_precision: 5
    }
  };
};

export const NumberAround = (number, ticker = 'ETH', rounded = 8) => {
  return Number(randomRounded(number, rounded), ticker);
}

export const fromEth = (amount, ticker) => {
  return ({
    ETH: 1,
    WETH: 1,
    LRC: 2500,
    APPC: 3500,
    BAT: 1000,
    BNB: 1000,
    OMG: 1000,
    MKR: 1000,
    WTC: 1000,
    USD: 200
  }[ticker] || 0) * amount;
};
