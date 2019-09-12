import * as types from './types';

export const getSellAdsRequest = params => ({
  type: types.GET_REQUEST,
  payload: params,
});
