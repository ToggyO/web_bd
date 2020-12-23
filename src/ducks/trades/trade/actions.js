import * as types from './types';

export const initiateTradeRequest = data => ({
  type: types.INITIATE_REQUEST,
  payload: data,
});

export const getTradeByIdRequest = id => ({
  type: types.GET_BY_ID_REQUEST,
  payload: id,
});

export const confirmTradeRequest = params => ({
  type: types.CONFIRM_REQUEST,
  payload: params,
});

export const fiatSentRequest = id => ({
  type: types.FIAT_SENT_REQUEST,
  payload: id,
});

export const fiatReceivedRequest = id => ({
  type: types.FIAT_RECEIVED_REQUEST,
  payload: id,
});

export const deleteNewTradeRequest = id => ({
  type: types.DELETE_NEW_REQUEST,
  payload: id,
});
