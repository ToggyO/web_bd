import { createSelector } from 'reselect';
import { formatMoney } from '@utils';

export const tradesSelector = createSelector(
  state => state.trades.trades.data.items,
  trades =>
    trades.map(el => ({
      key: el.trade.id,
      createdAt: new Date(el.trade.createDate).getTime(),
      tradeLimit: `${formatMoney(el.trade.ad.minTradeLimit)} - ${formatMoney(el.trade.ad.maxTradeLimit)} ${
        el.trade.ad.currency
      }`,
      adOwner: el.trade.ad.userName,
      tradePartner: el.trade.tradePartner,
      type: el.trade.ad.type,
      amount: el.trade.amount,
      currency: el.trade.ad.currency,
      fiat: el.trade.fiat,
      location: el.trade.ad.location,
      payment: el.trade.ad.payment,
      btcPrice: el.trade.ad.btcPrice,
      terms: el.trade.ad.terms,
      direction: el.direction,
    }))
);

export const tradesLoadingSelector = createSelector(
  state => state.trades.trades.loading,
  loading => loading
);

export const tradeSelector = createSelector(
  state => state.trades.trade.data,
  trade => trade
);
