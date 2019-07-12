import * as types from './types';

export const initiateTransactionRequest = data => ({
  type: types.INITIATE_TRANSACTION_REQUEST,
  payload: data,
});
