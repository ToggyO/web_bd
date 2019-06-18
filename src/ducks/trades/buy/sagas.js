import { takeLatest, call, put } from 'redux-saga/effects';
import api from '@services/api';
import * as buyTradesTypes from './types';

function* getBuyTrades(action) {
  try {
    const data = yield call(api.trades.getTrades, action.payload);
    yield put({ type: buyTradesTypes.GET_SUCCESS, payload: data.data });
  } catch (error) {
    yield put({ type: buyTradesTypes.GET_ERROR, payload: error });
  }
}
export function* getBuyTradesSaga() {
  yield takeLatest(buyTradesTypes.GET_REQUEST, getBuyTrades);
}
