import { createSelector } from 'reselect';

import { formatMoney, formatCapitals } from '@utils';

export const adsSelector = createSelector(
  state => state.users.user.ads.data.items,
  items =>
    items.map(({ ad }) => ({
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
);

export const adsLoadingSelector = createSelector(
  state => state.users.user.ads.loading,
  loading => loading,
);

export const totalQuantitySelector = createSelector(
  state => state.users.user.ads.data.total,
  total => total,
);
