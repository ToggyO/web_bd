import * as types from './types';

export const getAllRequest = params => ({
  type: types.GET_ALL_REQUEST,
  payload: params,
});

export const getMyRequest = params => ({
  type: types.GET_MY_REQUEST,
  payload: params,
});
