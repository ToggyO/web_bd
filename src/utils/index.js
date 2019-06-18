/* eslint-disable no-restricted-globals */
export const getQueries = url => {
  const startIndex = url.indexOf('userId');
  const [userId, code] = url.slice(startIndex).split('&');
  return {
    userId: userId.replace('userId=', ''),
    code: decodeURIComponent(code.replace('code=', '')),
  };
};

export const notUndefinedObjectProps = obj => !Object.values(obj).includes(undefined);

export const secretize = str => `${str.substring(0, 2)}****${str.substring(6)}`;

export const parseBase64 = base64 => {
  const [base64Type, base64Data] = base64.split(';base64,');
  return { base64Image: base64Data, contentType: base64Type.slice(5) };
};

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

export const formatCapitals = stringWithCapitalLetters => stringWithCapitalLetters.match(/[A-Z][a-z]+/g).join(' ');
