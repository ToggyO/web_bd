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
