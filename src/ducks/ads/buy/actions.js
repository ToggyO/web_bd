import * as types from './types';

export const getBuyAdsRequest = params => ({
  type: types.GET_REQUEST,
  payload: params,
});
