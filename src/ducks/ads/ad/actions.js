import * as types from './types';

export const createAdRequest = values => ({
  type: types.CREATE_REQUEST,
  payload: values,
});

export const getAdByIdRequest = id => ({
  type: types.GET_BY_ID_REQUEST,
  payload: id,
});

export const toggleAdStatusRequest = idWithStatus => ({
  type: types.TOGGLE_STATUS_REQUEST,
  payload: idWithStatus,
});

export const editAdRequest = values => ({
  type: types.EDIT_REQUEST,
  payload: values,
});

export const deleteAdRequest = id => ({
  type: types.DELETE_REQUEST,
  payload: id,
});

export const persistFormState = values => ({
  type: types.PERSIST_FORM_STATE,
  payload: values,
});

export const cleanFormState = () => ({
  type: types.CLEAN_FORM_STATE,
});
