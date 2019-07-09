import * as types from './types';

export const getCreatedAdsRequest = values => ({
  type: types.GET_CREATED_ADS_REQUEST,
  payload: values,
});

export const getMyCreatedAdsRequest = values => ({
  type: types.GET_MY_CREATED_ADS_REQUEST,
  payload: values,
});
