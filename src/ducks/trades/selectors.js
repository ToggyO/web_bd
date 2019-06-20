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
      userName: trade.userName,
      location: trade.location,
      btcPrice: `${formatMoney(trade.btcPrice)} ${trade.currency}`,
      type: trade.type,
    }))
);

export const tradesLoadingSelector = createSelector(
  state => state.loading,
  loading => loading
);
