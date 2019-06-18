import * as types from './types';

export const getSellTradesRequest = params => ({
  type: types.GET_REQUEST,
  payload: params,
});
