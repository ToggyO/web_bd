import { createSelector } from 'reselect';
import { formatMoney, formatCapitals } from '@utils';

export const tradesSelector = createSelector(
  state => state.items,
  items =>
    items.map(({ trade }) => ({
      key: trade.id,
      transactionLimits: `${formatMoney(trade.minTransactionLimit)} - ${formatMoney(trade.maxTransactionLimit)} ${
        trade.currency
      }`,
      paymentMethod: formatCapitals(trade.paymentMethod),
      profile: 'username',
      // profile: trade.profile,
      location: formatCapitals(trade.location),
      btcPrice: `${formatMoney(trade.btcPrice)} ${trade.currency}`,
      type: trade.type,
    }))
);
