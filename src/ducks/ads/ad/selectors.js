import { createSelector } from 'reselect';

export const loadingSelector = state => state.ads.ad.loading;

export const dataSelector = createSelector(
  state => state.ads.ad,
  ({ data }) => ({
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
    escrowFee: data.escrowFee,
  }),
);
