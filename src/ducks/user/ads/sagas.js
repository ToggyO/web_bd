import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './types';

import api from '@services/api';

function* getAdsByUserName(action) {
  try {
    const { data } = yield call(api.users.getAdsByUserName, action.payload);
    yield put({ type: types.GET_ADS_BY_USERNAME_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ADS_BY_USERNAME_ERROR, payload: error });
  }
}

export function* getAdsByUserNameSaga() {
  yield takeLatest(types.GET_ADS_BY_USERNAME_REQUEST, getAdsByUserName);
}
