import { takeLatest, call, put } from 'redux-saga/effects';
import { message, Modal } from 'antd';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import api from '@services/api';
import * as adTypes from './types';
import { adsTypes } from '../ads';

function* createAd(action) {
  try {
    const { data } = yield call(api.ads.createAd, action.payload);
    yield put({ type: adTypes.CREATE_SUCCESS, payload: data });
    yield call(history.push, {
      pathname: ROUTES.DASHBOARD.CREATED,
      state: { id: data.id },
    });
    yield call(message.success, 'Success! Ad has been created');
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
    yield call(message.success, 'Success! Ad has been changed');
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

    yield call(Modal.destroyAll);
    yield put({
      type: adsTypes.GET_MY_CREATED_REQUEST,
      payload: 'created',
    });
  } catch (error) {
    yield put({ type: adTypes.DELETE_ERROR, payload: error });
  }
}

export function* deleteAdSaga() {
  yield takeLatest(adTypes.DELETE_REQUEST, deleteAd);
}

function* toggleAdStatus(aciton) {
  try {
    const { data } = yield call(api.ads.toggleAdStatus, aciton.payload);
    yield put({ type: adTypes.TOGGLE_STATUS_SUCCESS, payload: data });

    yield put({
      type: adsTypes.GET_MY_CREATED_REQUEST,
      payload: 'created',
    });
  } catch (error) {
    yield put({ type: adTypes.TOGGLE_STATUS_ERROR, payload: error });
  }
}

export function* toggleAdStatusSaga() {
  yield takeLatest(adTypes.TOGGLE_STATUS_REQUEST, toggleAdStatus);
}
