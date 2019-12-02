import { createSelector } from 'reselect';

import { formatMoney, formatCapitals } from '@utils';

export const dataSelector = createSelector(
  state => state.adds.data.items,
  state => state.adds.data.pagination,
  (items, pagination) => ({
    items: items.map(({ ad }) => ({
      key: ad.id,
      order: ad.order,
      createdAt: new Date(ad.createDate).getTime(),
      tradeLimit: `${formatMoney(ad.minTradeLimit)} - ${formatMoney(ad.maxTradeLimit)} ${ad.currency}`,
      payment: formatCapitals(ad.payment),
      userName: ad.userName,
      location: ad.location,
      btcPrice: `${formatMoney(ad.btcPrice)} ${ad.currency}`,
      terms: ad.terms,
      shown: ad.shown,
      type: ad.type,
    })),
    pagination,
  }),
);

export const loadingSelector = state => state.adds.loading;
export const totalSelector = state => state.adds.data.pagination.total;
