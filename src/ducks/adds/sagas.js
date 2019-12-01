import { put, call, takeLatest } from 'redux-saga/effects';

import * as addsTypes from './types';

import api from '@services/api';

function* getAll(action) {
  try {
    const { data } = yield call(api.ads.getAllAds, action.payload);
    yield put({ type: addsTypes.GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: addsTypes.GET_ALL_ERROR, payload: error });
  }
}

export function* getAllSaga() {
  yield takeLatest(addsTypes.GET_ALL_REQUEST, getAll);
}

function* getMy(action) {
  try {
    const { data } = yield call(api.ads.getMyAds, action.payload);
    yield put({ type: addsTypes.GET_MY_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: addsTypes.GET_MY_ERROR, payload: error });
  }
}

export function* getMySaga() {
  yield takeLatest(addsTypes.GET_MY_REQUEST, getMy);
}
