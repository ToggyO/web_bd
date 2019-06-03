import { takeLatest, call, put } from 'redux-saga/effects';
import userProfileAPI from 'src/services/api/user';
import * as types from './types';

function* getUserProfile() {
  try {
    const data = yield call(userProfileAPI.getUserProfile);
    yield put({ type: types.GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_USER_PROFILE_ERROR, payload: error });
  }
}
export function* getUserProfileSaga() {
  yield takeLatest(types.GET_USER_PROFILE_REQUEST, getUserProfile);
}
