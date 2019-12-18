import { currencies } from '@config';

const currency = currencies.reduce((acc, val) => {
  acc[val.name] = val.value;

  return acc;
}, {});

export const determineUserInHeader = (td, tp, ao) => (td === 'Incoming' ? tp : ao);

export const determineUserRoles = (td, at) => {
  let action;
  let me;
  let other;

  switch (at) {
    case 'Sell': {
      if (td === 'Outgoing') {
        action = 'Buy bitcoins from ';
        me = 'buyer';
        other = 'seller';
      }
      if (td === 'Incoming') {
        action = 'Sell bitcoins to ';
        me = 'seller';
        other = 'buyer';
      }
      return [action, me, other];
    }

    case 'Buy': {
      if (td === 'Incoming') {
        action = 'Buy bitcoins from ';
        me = 'buyer';
        other = 'seller';
      }
      if (td === 'Outgoing') {
        action = 'Sell bitcoins to ';
        me = 'seller';
        other = 'buyer';
      }
      return [action, me, other];
    }

    default:
      return ['', '', ''];
  }
};

export const determineReviewable = (ts, tc, tf) => {
  const conditions = ['Completed', 'ResolvedToBuyer', 'ResolvedToSeller'];

  if (conditions.includes(ts))
    switch (tc) {
      case currency.USD:
        // return tf > 500;
        return tf > 1;
      case currency.RUB:
        // return tf > 30000;
        return tf > 30;
      case currency.VES:
        // return tf > 10000000;
        return tf > 100;
      default:
        return false;
    }
  return false;
};
