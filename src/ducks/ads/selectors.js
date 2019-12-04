import { createSelector } from 'reselect';

import { formatMoney, formatCapitals } from '@utils';

const adsByTypeSelector = (state, props) => state.ads[props.type];
const adsItemsSelector = (state, props) => state.ads[props.type].data.items;

export const adsSelector = createSelector([adsItemsSelector], items =>
  items.map(({ ad }) => ({
    key: ad.id,
    order: ad.order,
    createDate: new Date(ad.createDate).getTime(),
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

export const adsPaginationSelector = createSelector([adsByTypeSelector], ads => ({
  total: ads.data.total,
  current: ads.data.page,
  pageSize: ads.data.pageSize,
}));

export const adsTotalQuantitySelector = createSelector([adsByTypeSelector], ads => ads.data.total);

export const adsLoadingSelector = createSelector([adsByTypeSelector], adsByType => adsByType.loading);

export const totalPagesQuantitySelector = createSelector(
  [adsByTypeSelector],
  adsByType => adsByType.data.total,
);

export const adSelector = createSelector([adsByTypeSelector], ({ data }) => ({
  id: data.id,
  order: data.order,
  type: data.type,
  location: data.location,
  currency: data.currency,
  payment: data.payment,
  bankName: data.bankName,
  margin: data.margin,
  btcPrice: data.btcPrice,
  minTradeLimit: data.minTradeLimit,
  maxTradeLimit: data.maxTradeLimit,
  terms: data.terms,
  userName: data.userName,
  adOwnerID: data.userId,
}));
