import { takeLatest, call, put } from 'redux-saga/effects';

import * as sellAdsTypes from './types';

import api from '@services/api';

function* getSellAds(action) {
  try {
    const data = yield call(api.ads.getAds, action.payload);
    yield put({ type: sellAdsTypes.GET_SUCCESS, payload: data.data });
  } catch (error) {
    yield put({ type: sellAdsTypes.GET_ERROR, payload: error });
  }
}
export function* getSellAdsSaga() {
  yield takeLatest(sellAdsTypes.GET_REQUEST, getSellAds);
}
