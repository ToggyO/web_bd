import * as types from './types';

export const getBuyTradesRequest = params => ({
  type: types.GET_REQUEST,
  payload: params,
});
