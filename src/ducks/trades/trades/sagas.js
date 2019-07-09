import { put, call, takeLatest } from 'redux-saga/effects';
import api from '@services/api';
import * as tradesTypes from './types';

function* getCreatedAds(action) {
  try {
    const { data } = yield call(api.trades.getTrades, action.payload);
    yield put({ type: tradesTypes.GET_CREATED_ADS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: tradesTypes.GET_CREATED_ADS_ERROR, payload: error });
  }
}

export function* getCreatedAdsSaga() {
  yield takeLatest(tradesTypes.GET_CREATED_ADS_REQUEST, getCreatedAds);
}

function* getMyCreatedAds(action) {
  try {
    const { data } = yield call(api.trades.getMyTrades, action.payload);
    yield put({ type: tradesTypes.GET_MY_CREATED_ADS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: tradesTypes.GET_MY_CREATED_ADS_ERROR, payload: error });
  }
}

export function* getMyCreatedAdsSaga() {
  yield takeLatest(tradesTypes.GET_MY_CREATED_ADS_REQUEST, getMyCreatedAds);
}
