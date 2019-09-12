import { takeLatest, put, call } from 'redux-saga/effects';
import api from '@services/api';
import * as types from './types';

function* getChatById(action) {
  try {
    const { data } = yield call(api.chat.getChatById, action.payload);
    yield put({ type: types.GET_BY_ID_SUCCESS, payload: data.trade.chat });
  } catch (error) {
    yield put({ type: types.GET_BY_ID_ERROR, payload: error });
  }
}

export function* getChatByIdSaga() {
  yield takeLatest(types.GET_BY_ID_REQUEST, getChatById);
}