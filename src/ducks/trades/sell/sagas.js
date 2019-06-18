import { takeLatest, call, put } from 'redux-saga/effects';
import api from '@services/api';
import * as sellTradesTypes from './types';

function* getSellTrades(action) {
  try {
    const data = yield call(api.trades.getTrades, action.payload);
    yield put({ type: sellTradesTypes.GET_SUCCESS, payload: data.data });
  } catch (error) {
    yield put({ type: sellTradesTypes.GET_ERROR, payload: error });
  }
}
export function* getSellTradesSaga() {
  yield takeLatest(sellTradesTypes.GET_REQUEST, getSellTrades);
}
