export const getInitialValuesBasedOnNavigatorLanguage = () => {
  switch (navigator.language) {
    case 'ru-RU':
      return {
        payment: 'PayPal',
        location: 'Russia',
        currency: 'RUB',
      };
    case 'es-VE':
      return {
        payment: 'PayPal',
        location: 'Venezuela',
        currency: 'VEF',
      };
    default:
      return {
        payment: 'PayPal',
        location: 'USA',
        currency: 'USD',
      };
  }
};
