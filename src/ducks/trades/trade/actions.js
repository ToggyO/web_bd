import * as types from './types';

export const postTradeRequest = values => ({
  type: types.POST_TRADE_REQUEST,
  payload: values,
});

export const getTradeByIdRequest = id => ({
  type: types.GET_TRADE_BY_ID_REQUEST,
  payload: id,
});

export const editTradeRequest = values => ({
  type: types.EDIT_TRADE_REQUEST,
  payload: values,
});

export const persistFormState = values => ({
  type: types.PERSIST_FORM_STATE,
  payload: values,
});
