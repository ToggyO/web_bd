import { createSelector } from 'reselect';
import { formatMoney, formatCapitals } from '@utils';

const tradesByTypeSelector = (state, props) => state.trades[props.type];
const tradesItemsSelector = (state, props) => state.trades[props.type].data.items;

export const tradesSelector = createSelector(
  [tradesItemsSelector],
  items =>
    items.map(({ trade }) => ({
      key: trade.id,
      createdAt: new Date(trade.createDate).getTime(),
      transactionLimit: `${formatMoney(trade.minTransactionLimit)} - ${formatMoney(
        trade.maxTransactionLimit
      )} ${trade.currency}`,
      payment: formatCapitals(trade.payment),
      userName: trade.userName,
      location: trade.location,
      btcPrice: `${formatMoney(trade.btcPrice)} ${trade.currency}`,
      terms: trade.terms,
      shown: trade.shown,
      type: trade.type,
    }))
);

export const tradeLoadingSelector = createSelector(
  [tradesByTypeSelector],
  tradesByType => tradesByType.loading
);

export const totalPagesQuantitySelector = createSelector(
  [tradesByTypeSelector],
  tradesByType => tradesByType.data.total
);

export const tradeSelector = createSelector(
  [tradesByTypeSelector],
  ({ data }) => ({
    id: data.id,
    type: data.type,
    location: data.location,
    currency: data.currency,
    payment: data.payment,
    bankName: data.bankName,
    margin: data.margin,
    btcPrice: data.btcPrice,
    minTransactionLimit: data.minTransactionLimit,
    maxTransactionLimit: data.maxTransactionLimit,
    terms: data.terms,
  })
);
