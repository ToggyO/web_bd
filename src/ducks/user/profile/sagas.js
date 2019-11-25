import { put, call, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import * as types from './types';

import api from '@services/api';

import history from '@services/history';
import { ROUTES } from '@config/constants';

function* getProfile(action) {
  try {
    const { data } = yield call(api.user.getProfile, action.payload);
    yield put({ type: types.GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_PROFILE_ERROR, payload: error });
    yield call(history.push, ROUTES.USERS.ROOT);
    yield call(message.error, 'No user found', 2);
  }
}

export function* getProfileSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfile);
}
