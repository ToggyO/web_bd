import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './types';

import api from '@services/api';

function* getReviewsByUserName(action) {
  try {
    const { data } = yield call(api.user.getReviewsByUserName, action.payload);
    yield put({ type: types.GET_REVIEWS_BY_USERNAME_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_REVIEWS_BY_USERNAME_ERROR, payload: error });
  }
}

export function* getReviewsByUserNameSaga() {
  yield takeLatest(types.GET_REVIEWS_BY_USERNAME_REQUEST, getReviewsByUserName);
}

function* getLikesCountByUserName(action) {
  try {
    const { data } = yield call(api.user.getLikesCountByUserName, action.payload);
    yield put({ type: types.GET_LIKES_COUNT_BY_USERNAME_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_LIKES_COUNT_BY_USERNAME_ERROR, payload: error });
  }
}

export function* getLikesCountByUserNameSaga() {
  yield takeLatest(types.GET_LIKES_COUNT_BY_USERNAME_REQUEST, getLikesCountByUserName);
}
