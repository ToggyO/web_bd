export default {
  phone: (val, prevValue) => {
    if (val && val.length > 1) {
      return +val ? val : prevValue;
    }
    return parseInt(val, 10) ? parseInt(val, 10) : undefined;
  },
};
