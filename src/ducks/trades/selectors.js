import { createSelector } from 'reselect';
import { formatMoney } from '@utils';

export const tradesSelector = createSelector(
  state => state.trades.trades.data.items,
  trades =>
    trades.map(({ trade }) => ({
      key: trade.id,
      createdAt: new Date(trade.createDate).getTime(),
      tradeLimit: `${formatMoney(trade.trade.minTradeLimit)} - ${formatMoney(trade.trade.maxTradeLimit)} ${
        trade.trade.currency
      }`,
      adOwner: trade.trade.userName,
      tradePartner: trade.profile.user.userName,
      type: trade.trade.type,
      tradeAmount: trade.tradeAmount,
      currency: trade.trade.currency,
      fiat: trade.fiat,
      location: trade.trade.location,
      payment: trade.trade.payment,
      btcPrice: trade.trade.btcPrice,
      terms: trade.trade.terms,
    }))
);

export const tradesLoadingSelector = createSelector(
  state => state.trades.trades.loading,
  loading => loading
);

export const tradeSelector = createSelector(
  state => state.trades.trade,
  trade => trade
);
