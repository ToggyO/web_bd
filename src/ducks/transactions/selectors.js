import { createSelector } from 'reselect';
import { formatMoney } from '@utils';

export const transactionsSelector = createSelector(
  state => state.transactions.transactions.data.items,
  transactions =>
    transactions.map(({ transaction }) => ({
      key: transaction.id,
      createdAt: new Date(transaction.createDate).getTime(),
      transactionLimit: `${formatMoney(transaction.trade.minTransactionLimit)} - ${formatMoney(
        transaction.trade.maxTransactionLimit
      )} ${transaction.trade.currency}`,
      adOwner: transaction.trade.userName,
      tradePartner: transaction.profile.user.userName,
      type: transaction.trade.type,
      tradeAmount: transaction.tradeAmount,
      currency: transaction.trade.currency,
      fiat: transaction.fiat,
      location: transaction.trade.location,
      payment: transaction.trade.payment,
      btcPrice: transaction.trade.btcPrice,
      terms: transaction.trade.terms,
    }))
);

export const transactionsLoadingSelector = createSelector(
  state => state.transactions.transactions.loading,
  loading => loading
);
