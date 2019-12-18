import { put, call, takeLatest } from 'redux-saga/effects';

import * as types from './types';

import api from '@services/api';

import history from '@services/history';
import { ROUTES } from '@config';

function* getUserProfile(action) {
  try {
    const { data } = yield call(api.user.getUserProfile, action.payload);
    yield put({ type: types.GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_PROFILE_ERROR, payload: error });
    yield call(history.push, ROUTES.HOME);
  }
}

export function* getUserProfileSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getUserProfile);
}
