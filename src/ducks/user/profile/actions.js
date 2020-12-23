import * as types from './types';

export const getProfileRequest = userName => ({
  type: types.GET_PROFILE_REQUEST,
  payload: userName,
});
