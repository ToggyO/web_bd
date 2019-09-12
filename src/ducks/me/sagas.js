import { takeLatest, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import api from '@services/api';
import * as types from './types';

function* getProfile() {
  try {
    const data = yield call(api.me.getProfile);
    yield put({ type: types.GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_PROFILE_ERROR, payload: error });
  }
}
export function* getProfileSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfile);
}

function* getSmsCode() {
  try {
    const data = yield call(api.me.getSmsCode);
    yield put({ type: types.GET_SMS_CODE_SUCCESS, payload: data });
    yield call(message.success, 'Verification code has been sent to your phone!');
  } catch (error) {
    yield put({ type: types.GET_SMS_CODE_ERROR, payload: error });
  }
}
export function* getSmsCodeSaga() {
  yield takeLatest(types.GET_SMS_CODE_REQUEST, getSmsCode);
}

function* editEmail(action) {
  try {
    const data = yield call(api.me.editUserEmail, action.payload);
    yield put({ type: types.EDIT_EMAIL_SUCCESS, payload: data });
    yield call(history.push, ROUTES.SETTINGS.ROOT);
    yield call(message.success, 'Email has been changed');
  } catch (error) {
    yield put({ type: types.EDIT_EMAIL_ERROR, payload: error.response.data.errors });
  }
}
export function* editEmailSaga() {
  yield takeLatest(types.EDIT_EMAIL_REQUEST, editEmail);
}

function* editFullName(action) {
  try {
    const data = yield call(api.me.editUserFullName, action.payload);
    yield put({ type: types.EDIT_FULLNAME_SUCCESS, payload: data });
    yield call(history.push, ROUTES.SETTINGS.ROOT);
    yield call(message.success, 'Your real name has been changed');
  } catch (error) {
    yield put({ type: types.EDIT_FULLNAME_ERROR, payload: error.response.data.errors });
  }
}
export function* editFullNameSaga() {
  yield takeLatest(types.EDIT_FULLNAME_REQUEST, editFullName);
}

function* editPhoneNumber(action) {
  try {
    const data = yield call(api.me.editUserPhoneNumber, action.payload);
    yield put({ type: types.EDIT_PHONENUMBER_SUCCESS, payload: data });
    yield call(history.push, { state: { email: data.data } });
  } catch (error) {
    yield put({ type: types.EDIT_PHONENUMBER_ERROR, payload: error.response.data.errors });
  }
}
export function* editPhoneNumberSaga() {
  yield takeLatest(types.EDIT_PHONENUMBER_REQUEST, editPhoneNumber);
}

function* editPassword(action) {
  try {
    const data = yield call(api.me.editUserPassword, action.payload);
    yield put({ type: types.EDIT_PASSWORD_SUCCESS, payload: data });
    yield call(history.push, ROUTES.SETTINGS.ROOT);
    yield call(message.success, 'Your password has been changed');
  } catch (error) {
    yield put({ type: types.EDIT_PASSWORD_ERROR, payload: error.response.data.errors });
  }
}
export function* editPasswordSaga() {
  yield takeLatest(types.EDIT_PASSWORD_REQUEST, editPassword);
}
