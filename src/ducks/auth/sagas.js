import { takeLatest, put, call } from 'redux-saga/effects';
import { message } from 'antd';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import api from '@services/api';
import * as types from './types';
import * as userProfileTypes from '../user/types';

/*
	function* workerSaga
	export function* watcherSaga
*/

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* signUp(action) {
  try {
    const data = yield call(api.auth.signUp, action.payload);
    yield put({ type: types.SIGNUP_SUCCESS, payload: data });
    history.push(ROUTES.CONFIRM_EMAIL);
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: types.SIGNUP_ERROR, payload: errors });
  }
}

export function* signUpSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signUp);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* signIn(action) {
  try {
    const data = yield call(api.auth.signIn, action.payload);
    yield put({ type: types.SIGNIN_SUCCESS, payload: data });
    history.push(ROUTES.WELCOME_BACK);
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: types.SIGNIN_ERROR, payload: errors });
    message.error('Your login or password was incorrect');
  }
}

export function* signInSaga() {
  yield takeLatest(types.SIGNIN_REQUEST, signIn);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* smsCodeRequest(action) {
  try {
    const data = yield call(api.auth.smsCodeRequest, action.payload);
    yield put({ type: types.SMS_CODE_REQUEST_SUCCESS, payload: data });
    message.success('The verification code has been sent to your phone!');
  } catch (error) {
    yield put({
      type: types.SMS_CODE_REQUEST_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* smsCodeRequestSaga() {
  yield takeLatest(types.SMS_CODE_REQUEST, smsCodeRequest);
}

/*---------------------------------------------------------------------------*/
// Getting tokens here                                                       //
/*---------------------------------------------------------------------------*/

function* twoFactorAuth(action) {
  try {
    const data = yield call(api.auth.twoFactorAuth, action.payload);
    yield put({ type: types.TWO_FACTOR_AUTH_SUCCESS, payload: data });

    history.push(ROUTES.HOME);
  } catch (error) {
    yield put({
      type: types.TWO_FACTOR_AUTH_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* twoFactorAuthSaga() {
  yield takeLatest(types.TWO_FACTOR_AUTH_REQUEST, twoFactorAuth);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* forgotPassword(action) {
  try {
    const data = yield call(api.auth.forgotPassword, action.payload);
    yield put({ type: types.FORGOT_PASSWORD_SUCCESS, payload: data });
    message.success(`Thanks! Please check ${action.payload.email} for a link to reset your password.`);
  } catch (error) {
    yield put({
      type: types.FORGOT_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
    message.error('No users found');
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword);
}

/*---------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------*/

function* resetPassword(action) {
  try {
    const data = yield call(api.auth.resetPassword, action.payload);
    yield put({ type: types.RESET_PASSWORD_SUCCESS, payload: data });
    message.success(`Password for ${data.data.userName} has been successfully changed`);
    history.push(ROUTES.LOGIN);
  } catch (error) {
    yield put({
      type: types.RESET_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
    message.error('Looks like the link you have followed has expired');
  }
}

export function* resetPasswordSaga() {
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPassword);
}

/*---------------------------------------------------------------------------*/

function* refreshingToken(action) {
  try {
    console.log(action);
    const data = yield call(api.auth.refreshingToken, action.payload);

    console.log(data);
  } catch (error) {
    console.log('error');
  }
}

export function* refreshingTokenSaga() {
  yield takeLatest(types.REFRESHING_TOKEN_REQUEST, refreshingToken);
}
