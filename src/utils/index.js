/* eslint-disable no-restricted-globals */
// parsing url callback from backend...
export const getQueries = url => {
  const startIndex = url.indexOf('userId');
  const [userId, code] = url.slice(startIndex).split('&');
  return {
    userId: userId.replace('userId=', ''),
    code: decodeURIComponent(code.replace('code=', '')),
  };
};

export const catchFromPath = (path, separators) => {
  if (Array.isArray(separators)) {
    const match = path.match(`${separators[0]}/(.*)/${separators[1]}`);
    if (match) return match[1];
  }
  const match = path.match(`${separators}/(.*)`);
  if (match) return match[1].replace('/', '');
  return '';
};

// simple check for values from form
export const notUndefinedObjectProps = obj => !Object.values(obj).includes(undefined);

// cleans object from falsies
export const purifyObject = obj => {
  const cleanObject = {};
  Object.keys(obj).forEach(property => {
    if (obj[property]) {
      cleanObject[property] = obj[property];
    }
  });
  return cleanObject;
};

// nuff said
export const secretize = str => `${str.substring(0, 2)}****${str.substring(6)}`;

// spliting base64 on parts to submit image from Request Verification Form
export const parseBase64 = base64 => {
  const [base64Type, base64Data] = base64.split(';base64,');
  return { base64Image: base64Data, contentType: base64Type.slice(5) };
};

// casual money-formatting function
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

// inserts space
export const formatCapitals = stringWithCapitalLetters => {
  if (!stringWithCapitalLetters) return '';
  if (stringWithCapitalLetters.toLowerCase() === 'paypal') return stringWithCapitalLetters;
  if (stringWithCapitalLetters.toLowerCase() === 'qiwi') return stringWithCapitalLetters;
  return stringWithCapitalLetters.match(/[A-Z][a-z]+/g).join(' ');
};

// creates search string based on form values for GET request
export const makeQueryStringFromObject = obj => {
  let queryString = '?';
  Object.entries(obj).forEach(([key, value]) => {
    let modifiedKey = `${key}[]`;

    if (key === 'amount' || key === 'page' || key === 'field' || key === 'order') {
      modifiedKey = key;
    }

    queryString += `${modifiedKey}=${value}&`;
  });
  queryString = queryString.slice(0, -1);
  return queryString;
};

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

export const formatDate = (timestamp, locale) => {
  const date = new Date(timestamp);

  let day;
  day = date.getDate().toString();
  if (day.length < 2) day = `0${day}`;

  let month;
  month = (date.getMonth() + 1).toString();
  if (month.length < 2) month = `0${month}`;

  const year = date
    .getFullYear()
    .toString()
    .slice(2);

  if (locale) return `${month}.${day}.${year}`;
  return `${day}.${month}.${year}`;
};

export const sortStrings = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const prettifyId = id => id.split('-')[0];
