import { put, call, takeLatest } from 'redux-saga/effects';
import api from '@services/api';
import * as types from './types';

function* getNewTrades(action) {
  try {
    const { data } = yield call(api.trades.getTrades, action.payload);
    yield put({ type: types.GET_NEW_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_NEW_ERROR, payload: error });
  }
}

export function* getNewTradesSaga() {
  yield takeLatest(types.GET_NEW_REQUEST, getNewTrades);
}

function* getActiveTrades(action) {
  try {
    const { data } = yield call(api.trades.getTrades, action.payload);
    yield put({ type: types.GET_ACTIVE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ACTIVE_ERROR, payload: error });
  }
}

export function* getActiveTradesSaga() {
  yield takeLatest(types.GET_ACTIVE_REQUEST, getActiveTrades);
}
