import { takeLatest, put, call } from 'redux-saga/effects';

import { message } from 'antd';

import * as types from './types';

import api from '@services/api';

function* getReviewByOrder(action) {
  try {
    const { data } = yield call(api.reviews.getReviewByOrder, action.payload);
    yield put({ type: types.GET_REVIEW_BY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_REVIEW_BY_ORDER_ERROR, payload: error });
  }
}

export function* getReviewByOrderSaga() {
  yield takeLatest(types.GET_REVIEW_BY_ORDER_REQUEST, getReviewByOrder);
}

function* postReview(action) {
  try {
    const { data } = yield call(api.reviews.postReview, action.payload);
    yield put({ type: types.POST_REVIEW_SUCCESS, payload: data });
    yield call(message.success, 'Your review has been successfully submitted');
  } catch (error) {
    yield put({ type: types.POST_REVIEW_ERROR, payload: error });
    yield call(message.error, 'Couldn’t submit your review at this time. Please try again later');
  }
}

export function* postReviewSaga() {
  yield takeLatest(types.POST_REVIEW_REQUEST, postReview);
}
