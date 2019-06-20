export const getInitialValuesBasedOnNavigatorLanguage = () => {
  switch (navigator.language) {
    case 'ru-RU':
      return {
        location: 'Russia',
        currency: 'RUB',
      };
    case 'es-VE':
      return {
        location: 'Venezuela',
        currency: 'VEF',
      };
    default:
      return {
        location: 'USA',
        currency: 'USD',
      };
  }
};
