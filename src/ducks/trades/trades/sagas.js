import { put, call, takeLatest } from 'redux-saga/effects';
import api from '@services/api';
import * as types from './types';

function* getPendingTrades(action) {
  try {
    const { data } = yield call(api.trades.getTrades, action.payload);
    yield put({ type: types.GET_PENDING_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_PENDING_ERROR, payload: error });
  }
}

export function* getPendingTradesSaga() {
  yield takeLatest(types.GET_PENDING_REQUEST, getPendingTrades);
}
