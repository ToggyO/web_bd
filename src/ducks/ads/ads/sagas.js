import { put, call, takeLatest } from 'redux-saga/effects';

import * as adsTypes from './types';

import api from '@services/api';

function* getCreatedAds(action) {
  try {
    const { data } = yield call(api.ads.getAds, action.payload);
    yield put({ type: adsTypes.GET_CREATED_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: adsTypes.GET_CREATED_ERROR, payload: error });
  }
}

export function* getCreatedAdsSaga() {
  yield takeLatest(adsTypes.GET_CREATED_REQUEST, getCreatedAds);
}

function* getMyCreatedAds(action) {
  try {
    const { data } = yield call(api.ads.getMyAds, action.payload);
    yield put({ type: adsTypes.GET_MY_CREATED_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: adsTypes.GET_MY_CREATED_ERROR, payload: error });
  }
}

export function* getMyCreatedAdsSaga() {
  yield takeLatest(adsTypes.GET_MY_CREATED_REQUEST, getMyCreatedAds);
}
