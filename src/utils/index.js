/* eslint-disable no-restricted-globals */
import React from 'react';

/**
 * Gets userId and code from URL
 * @param {string} url URL string
 * @returns {{userId: string, code: string}}
 */
export const getQueries = url => {
  const startIndex = url.indexOf('userId');
  const [userId, code] = url.slice(startIndex).split('&');
  return {
    userId: userId.replace('userId=', ''),
    code: decodeURIComponent(code.replace('code=', '')),
  };
};

/**
 * Catches part of pathname between separators (if provided Array) or after separator (if provided string)
 * @param {string} path history.location.pathname
 * @param {string[] | string} separators Array of strings or string
 * @returns {string}
 */
export const catchFromPath = (path, separators) => {
  if (Array.isArray(separators)) {
    const match = path.match(`${separators[0]}/(.*)/${separators[1]}`);
    if (match) return match[1];
  }
  const match = path.match(`${separators}/(.*)`);
  if (match) return match[1].replace('/', '');
  return '';
};

/**
 * Returns true if there are no undefined values in object keys
 * @param {{}} obj Any object
 * @returns {boolean}
 */
export const notUndefinedObjectProps = obj => !Object.values(obj).includes(undefined);

/**
 * Splits Base64-like string to parts
 * @param {string} base64 Base64 string
 * @returns {{base64Image: string, contentType: string}}
 */
export const parseBase64 = base64 => {
  const [base64Type, base64Data] = base64.split(';base64,');
  return { base64Image: base64Data, contentType: base64Type.slice(5) };
};

/**
 * Formats money the way you want to
 * @param {number} amount Amount of money
 * @param {number} [decimalCount = 2] Quantity of decimals
 * @param {string} [decimal = '.'] Decimal separator
 * @param {string} [thousands = '.'] Thousands separator
 * @example
 *  formatMoney(6666.101, 2)
 */
export const formatMoney = (amount, decimalCount = 2, decimal = '.', thousands = ',') => {
  let newDecimalCount;
  let newAmount;
  newDecimalCount = Math.abs(decimalCount);
  newDecimalCount = isNaN(decimalCount) ? 2 : decimalCount;

  const negativeSign = amount < 0 ? '-' : '';

  const i = parseInt((newAmount = Math.abs(Number(amount) || 0).toFixed(newDecimalCount)), 10).toString();
  const j = i.length > 3 ? i.length % 3 : 0;

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
    (newDecimalCount
      ? decimal +
        Math.abs(newAmount - i)
          .toFixed(newDecimalCount)
          .slice(2)
      : '')
  );
};

/**
 * Insert spaces between capital letters in string
 * @param {string} stringWithCapitalLetters String with capital letters
 * @returns {string}
 * @example
 *  formatCapitals('StringLikeThis')
 */
export const formatCapitals = stringWithCapitalLetters => {
  if (!stringWithCapitalLetters) return '';
  if (stringWithCapitalLetters.toLowerCase() === 'paypal') return stringWithCapitalLetters;
  if (stringWithCapitalLetters.toLowerCase() === 'qiwi') return stringWithCapitalLetters;
  return stringWithCapitalLetters.match(/[A-Z][a-z]+/g).join(' ');
};

/**
 * Injects array-ish notation for keys: type, location, payment, currency. Alse replaces 'current' key with 'page' key
 * @param {{}} params Object with keys
 */
export const formatParamsForParakhnevich = params => {
  const newParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (key === 'type' || key === 'location' || key === 'payment' || key === 'currency') {
      newParams[`${key}[]`] = value;
    } else if (key === 'current') {
      newParams.page = value;
    } else {
      newParams[key] = value;
    }
  });
  return newParams;
};

/**
 * Reduces current page for 1 if total === pageSize (when you deleting last item on the page)
 * @param {{total: number, current: number, pageSize: number}} paginationObj pagination props
 * @example
 *  smartPagination({total: 20, current: 3, pageSize: 10})
 */
export const smartPagination = ({ total, current, pageSize }) => {
  if (total % pageSize === 0) {
    return {
      total,
      pageSize,
      current: current - 1 === 0 ? 1 : current - 1,
    };
  }
  return { total, current, pageSize };
};

/**
 * Parses URL and returns object with key - value pairs
 * @param {string} queryString URL with queries
 * @example parseQueryString('ad?key=value&otherKey=otherValue')
 */
export const parseQueryString = queryString => {
  let str;
  const obj = {};
  str = queryString.replace('?', '');
  str = str.replace(/\[\]/g, '');
  str.split('&').forEach(keyValue => {
    const [key, value] = keyValue.split('=');
    obj[key] = value;
  });
  return obj;
};

/**
 * Basic string sorter
 * @param {string} a First string
 * @param {string} b Second string
 */
export const sortStrings = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

/**
 * Catches /n symbols in text
 * @param {string} text
 * @returns {string} formatted text
 */
export const catchNewLines = (text = '') => {
  if (text === '') return '';
  return text.split('\n').map((item, key) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={`${item.replace(/ /g, '+')}${key}`} style={{ color: 'inherit' }}>
      {item}
      <br />
    </span>
  ));
};
