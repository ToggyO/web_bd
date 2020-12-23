import { put, call, takeLatest } from 'redux-saga/effects';

import * as adsTypes from './types';

import api from '@services/api';

function* getAll(action) {
  try {
    const { data } = yield call(api.ads.getAllAds, action.payload);
    yield put({ type: adsTypes.GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: adsTypes.GET_ALL_ERROR, payload: error });
  }
}

export function* getAllSaga() {
  yield takeLatest(adsTypes.GET_ALL_REQUEST, getAll);
}

function* getMy(action) {
  try {
    const { data } = yield call(api.ads.getMyAds, action.payload);
    yield put({ type: adsTypes.GET_MY_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: adsTypes.GET_MY_ERROR, payload: error });
  }
}

export function* getMySaga() {
  yield takeLatest(adsTypes.GET_MY_REQUEST, getMy);
}
