import * as types from './types';

export const getPendingTransactionsRequest = transactionType => ({
  type: types.GET_PENDING_TRANSACTIONS_REQUEST,
  payload: transactionType,
});
