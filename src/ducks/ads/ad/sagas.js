import { takeLatest, call, put, select } from 'redux-saga/effects';
import { message } from 'antd';

import * as adTypes from './types';

import { adsActions, adsSelectors } from '@ducks/ads';

import { ROUTES } from '@config';
import history from '@services/history';
import api from '@services/api';
import { formatParamsForParakhnevich } from '@utils/';

function* createAd(action) {
  try {
    const { data } = yield call(api.ads.createAd, action.payload);
    yield put({ type: adTypes.CREATE_SUCCESS, payload: data });
    yield call(history.push, {
      pathname: ROUTES.DASHBOARD.CREATED,
      state: { id: data.id },
    });
    yield call(message.success, 'Success! Ad has been created', 2);
  } catch (error) {
    yield put({ type: adTypes.CREATE_ERROR, payload: error });
  }
}

export function* createAdSaga() {
  yield takeLatest(adTypes.CREATE_REQUEST, createAd);
}

function* getAdById(action) {
  try {
    const { data } = yield call(api.ads.getAdById, action.payload);
    yield put({ type: adTypes.GET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: adTypes.GET_BY_ID_ERROR, payload: error });
    yield call(history.push, ROUTES.DASHBOARD.ROOT);
  }
}

export function* getAdByIdSaga() {
  yield takeLatest(adTypes.GET_BY_ID_REQUEST, getAdById);
}

function* editAd(action) {
  try {
    const { data } = yield call(api.ads.editAd, action.payload);
    yield put({ type: adTypes.EDIT_SUCCESS, payload: data });
    yield call(history.push, {
      pathname: ROUTES.DASHBOARD.CREATED,
      state: { id: data.id },
    });
    yield call(message.success, 'Success! Ad has been changed', 2);
  } catch (error) {
    yield put({ type: adTypes.EDIT_ERROR, payload: error });
  }
}

export function* editAdSaga() {
  yield takeLatest(adTypes.EDIT_REQUEST, editAd);
}

function* deleteAd(aciton) {
  try {
    const { data } = yield call(api.ads.deleteAd, aciton.payload);
    yield put({ type: adTypes.DELETE_SUCCESS, payload: data });

    const { pagination } = yield select(adsSelectors.dataSelector);

    yield put(adsActions.getMyRequest(formatParamsForParakhnevich(pagination)));

    yield call(message.success, 'Deleted!', 2);
  } catch (error) {
    yield put({ type: adTypes.DELETE_ERROR, payload: error });
  }
}

export function* deleteAdSaga() {
  yield takeLatest(adTypes.DELETE_REQUEST, deleteAd);
}

function* toggleAdStatus(action) {
  try {
    const { data } = yield call(api.ads.toggleAdStatus, action.payload);
    yield put({ type: adTypes.TOGGLE_STATUS_SUCCESS, payload: data.id });
  } catch (error) {
    yield put({ type: adTypes.TOGGLE_STATUS_ERROR, payload: error });
  }
}

export function* toggleAdStatusSaga() {
  yield takeLatest(adTypes.TOGGLE_STATUS_REQUEST, toggleAdStatus);
}
