import { createSelector } from 'reselect';

import { formatMoney } from '@utils';

export const tradesSelector = createSelector(
  state => state.trades.trades.data.items,
  trades =>
    trades.map(el => {
      let user;
      if (el.direction === 'Outgoing') user = el.trade.ad.userName;
      if (el.direction === 'Incoming') user = el.trade.tradePartner;

      return {
        key: el.trade.id,
        order: el.trade.order,
        createDate: new Date(el.trade.createDate).getTime(),
        tradeLimit: `${formatMoney(el.trade.ad.minTradeLimit)} - ${formatMoney(el.trade.ad.maxTradeLimit)} ${
          el.trade.ad.currency
        }`,
        adOwner: el.trade.ad.userName,
        tradePartner: user,
        type: el.trade.ad.type,
        amount: el.trade.amount,
        currency: el.trade.ad.currency,
        fiat: el.trade.fiat,
        location: el.trade.ad.location,
        payment: el.trade.ad.payment,
        btcPrice: el.trade.ad.btcPrice,
        terms: el.trade.ad.terms,
        status: el.trade.status,
        direction: el.direction,
      };
    }),
);

export const tradesLoadingSelector = createSelector(
  state => state.trades.trades.loading,
  loading => loading,
);

export const tradeSelector = createSelector(
  state => state.trades.trade.data,
  ({ trade, direction }) => ({
    id: trade.id,
    order: trade.order,
    amount: trade.amount,
    fiat: trade.fiat,
    tradePartner: trade.tradePartner,
    adOwner: trade.ad.userName,
    btcPrice: trade.ad.btcPrice,
    payment: trade.ad.payment,
    status: trade.status,
    minTradeLimit: trade.ad.minTradeLimit,
    maxTradeLimit: trade.ad.maxTradeLimit,
    currency: trade.ad.currency,
    location: trade.ad.location,
    terms: trade.ad.terms,
    adType: trade.ad.type,
    direction,
    buyerWallet: trade.multisigWallet.buyerReceivingWalletAddress,
    sellerWallet: trade.multisigWallet.sellerReceivingWalletAddress,
    multisigWalletAddress: trade.multisigWallet.multisigWalletAddress,
  }),
);

export const tradeLoadingSelector = createSelector(
  state => state.trades.trade.loading,
  loading => loading,
);
