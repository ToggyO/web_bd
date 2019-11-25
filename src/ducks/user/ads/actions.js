import * as types from './types';

export const getAdsByUserNameRequest = userName => ({
  type: types.GET_ADS_BY_USERNAME_REQUEST,
  payload: userName,
});
