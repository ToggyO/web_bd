import { takeLatest, call, put } from 'redux-saga/effects';

import * as buyAdsTypes from './types';

import api from '@services/api';

function* getBuyAds(action) {
  try {
    const data = yield call(api.ads.getAds, action.payload);
    yield put({ type: buyAdsTypes.GET_SUCCESS, payload: data.data });
  } catch (error) {
    yield put({ type: buyAdsTypes.GET_ERROR, payload: error });
  }
}
export function* getBuyAdsSaga() {
  yield takeLatest(buyAdsTypes.GET_REQUEST, getBuyAds);
}
