import * as types from './types';

export const getPendingTradesRequest = tradeType => ({
  type: types.GET_PENDING_REQUEST,
  payload: tradeType,
});
