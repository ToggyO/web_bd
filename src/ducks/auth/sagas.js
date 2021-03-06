import { takeLatest, put, call } from 'redux-saga/effects';
import { message } from 'antd';

import { meTypes } from '../me';

import * as authTypes from './types';

import { ROUTES } from '@config';
import history from '@services/history';
import api from '@services/api';

/*
	function* workerSaga
	export function* watcherSaga
*/

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* signUp(action) {
  try {
    const data = yield call(api.auth.signUp, action.payload);
    yield put({ type: authTypes.SIGNUP_SUCCESS, payload: data });
    history.push(ROUTES.CONFIRM_EMAIL);
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: authTypes.SIGNUP_ERROR, payload: errors });
  }
}

export function* signUpSaga() {
  yield takeLatest('auth/SIGNUP_REQUEST', signUp);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* signIn(action) {
  try {
    const data = yield call(api.auth.signIn, action.payload);
    yield put({ type: authTypes.SIGNIN_SUCCESS, payload: data });
    history.push(ROUTES.WELCOME_BACK + action.extra);
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: authTypes.SIGNIN_ERROR, payload: errors });
  }
}

export function* signInSaga() {
  yield takeLatest('auth/SIGNIN_REQUEST', signIn);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* smsCodeRequest(action) {
  try {
    const data = yield call(api.auth.smsCodeRequest, action.payload);
    yield put({ type: authTypes.SMS_CODE_REQUEST_SUCCESS, payload: data });
    yield call(message.success, 'A text message has been sent to your phone');
  } catch (error) {
    yield put({
      type: authTypes.SMS_CODE_REQUEST_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* smsCodeRequestSaga() {
  yield takeLatest('auth/SMS_CODE_REQUEST', smsCodeRequest);
}

/*---------------------------------------------------------------------------*/
// Getting tokens here                                                       //
/*---------------------------------------------------------------------------*/

function* twoFactorAuth(action) {
  try {
    const data = yield call(api.auth.twoFactorAuth, action.payload);
    yield put({ type: authTypes.TWO_FACTOR_AUTH_SUCCESS, payload: data });
    if (action.extra) {
      history.push({ pathname: action.extra, search: '?cached' });
    } else {
      history.push(ROUTES.HOME);
    }
    yield put({ type: meTypes.GET_PROFILE_REQUEST });
  } catch (error) {
    yield put({
      type: authTypes.TWO_FACTOR_AUTH_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* twoFactorAuthSaga() {
  yield takeLatest('auth/TWO_FACTOR_AUTH_REQUEST', twoFactorAuth);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* forgotPassword(action) {
  try {
    const data = yield call(api.auth.forgotPassword, action.payload);
    yield put({ type: authTypes.FORGOT_PASSWORD_SUCCESS, payload: data });
    history.push({
      state: {
        letterHasBeenSent: true,
      },
    });
  } catch (error) {
    yield put({
      type: authTypes.FORGOT_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest('auth/FORGOT_PASSWORD_REQUEST', forgotPassword);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* resetPassword(action) {
  try {
    const data = yield call(api.auth.resetPassword, action.payload);
    yield put({ type: authTypes.RESET_PASSWORD_SUCCESS, payload: data });
    yield call(message.success, `Password for ${data.data.userName} has been successfully changed`);
    history.push(ROUTES.LOGIN);
  } catch (error) {
    yield put({
      type: authTypes.RESET_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* resetPasswordSaga() {
  yield takeLatest('auth/RESET_PASSWORD_REQUEST', resetPassword);
}

/*---------------------------------------------------------------------------*/

function* logout() {
  yield call(api.auth.logout);
}

export function* logoutSaga() {
  yield takeLatest('auth/LOGOUT_REQUEST', logout);
}
