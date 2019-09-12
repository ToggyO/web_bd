import * as types from './types';

export const getChatByIdRequest = id => ({
  type: types.GET_BY_ID_REQUEST,
  payload: id,
});
