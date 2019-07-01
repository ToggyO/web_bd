import { takeLatest, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import api from '@services/api';
import * as types from './types';

function* getUserProfile() {
  try {
    const data = yield call(api.userProfile.getUserProfile);
    yield put({ type: types.GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_USER_PROFILE_ERROR, payload: error });
  }
}
export function* getUserProfileSaga() {
  yield takeLatest(types.GET_USER_PROFILE_REQUEST, getUserProfile);
}

function* getSmsCode() {
  try {
    const data = yield call(api.userProfile.getSmsCode);
    yield put({ type: types.GET_SMS_CODE_SUCCESS, payload: data });
    yield call(message.success, 'The verification code has been sent to your phone!');
  } catch (error) {
    yield put({ type: types.GET_SMS_CODE_ERROR, payload: error });
  }
}
export function* getSmsCodeSaga() {
  yield takeLatest(types.GET_SMS_CODE_REQUEST, getSmsCode);
}

function* editEmail(action) {
  try {
    const data = yield call(api.userProfile.editUserEmail, action.payload);
    yield put({ type: types.EDIT_EMAIL_SUCCESS, payload: data });
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
    const data = yield call(api.userProfile.editUserFullName, action.payload);
    yield put({ type: types.EDIT_FULLNAME_SUCCESS, payload: data });
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
    const data = yield call(api.userProfile.editUserPhoneNumber, action.payload);
    yield put({ type: types.EDIT_PHONENUMBER_SUCCESS, payload: data });
    yield call(message.success, 'Please check your email to confirm your new phone number');
  } catch (error) {
    yield put({ type: types.EDIT_PHONENUMBER_ERROR, payload: error.response.data.errors });
  }
}
export function* editPhoneNumberSaga() {
  yield takeLatest(types.EDIT_PHONENUMBER_REQUEST, editPhoneNumber);
}

function* editPassword(action) {
  try {
    const data = yield call(api.userProfile.editUserPassword, action.payload);
    yield put({ type: types.EDIT_PASSWORD_SUCCESS, payload: data });
    yield call(message.success, 'Your password has been changed');
  } catch (error) {
    yield put({ type: types.EDIT_PASSWORD_ERROR, payload: error.response.data.errors });
  }
}
export function* editPasswordSaga() {
  yield takeLatest(types.EDIT_PASSWORD_REQUEST, editPassword);
}
