import { message } from 'antd';
import { takeLatest, put, call } from 'redux-saga/effects';
import { ROOTPATH, PATH } from 'paths';
import history from 'services/history';
import setAuthHeaders from 'services/setAuthHeaders';
import userAPI from 'src/services/api';
import * as actions from './actions';

/*
worker saga
watcher saga
*/

/*---------------------------------------------------------------------------*/

function* signUp(action) {
  try {
    const data = yield call(userAPI.signUp, action.payload);
    yield put({ type: actions.SIGNUP_SUCCESS, payload: data });
    history.push(`${ROOTPATH.AUTH}/${PATH.CONFIRM_EMAIL}`);
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: actions.SIGNUP_ERROR, payload: errors });
  }
}

export function* signUpSaga() {
  yield takeLatest(actions.SIGNUP_REQUEST, signUp);
}

/*---------------------------------------------------------------------------*/

function* signIn(action) {
  try {
    const data = yield call(userAPI.signIn, action.payload);
    yield put({ type: actions.SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('bdt', data.data.accessToken);
    setAuthHeaders(data.data.accessToken);
  } catch (error) {
    const { errors } = error.response.data;
    yield put({ type: actions.SIGNIN_ERROR, payload: errors });
    message.error('Your login or password was incorrect', 4);
  }
}

export function* signInSaga() {
  yield takeLatest(actions.SIGNIN_REQUEST, signIn);
}

/*---------------------------------------------------------------------------*/

function* smsCodeRequest(action) {
  try {
    const data = yield call(userAPI.smsCodeRequest, action.payload);
    yield put({ type: actions.SMS_CODE_REQUEST_SUCCESS, payload: data });
    message.success('The verification code has been sent to your phone!', 8);
  } catch (error) {
    yield put({
      type: actions.SMS_CODE_REQUEST_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* smsCodeRequestSaga() {
  yield takeLatest(actions.SMS_CODE_REQUEST, smsCodeRequest);
}

/*---------------------------------------------------------------------------*/

function* twoFactorAuth(action) {
  try {
    const data = yield call(userAPI.twoFactorAuth, action.payload);
    yield put({ type: actions.TWO_FACTOR_AUTH_SUCCESS, payload: data });
    message.success('Success! Two-factor authentication activated for your account');
    yield put({ type: actions.WIZARD_STEP_1 });
  } catch (error) {
    yield put({
      type: actions.TWO_FACTOR_AUTH_ERROR,
      payload: error.response.data.errors,
    });
  }
}

export function* twoFactorAuthSaga() {
  yield takeLatest(actions.TWO_FACTOR_AUTH_REQUEST, twoFactorAuth);
}

/*---------------------------------------------------------------------------*/

function* forgotPassword(action) {
  try {
    const data = yield call(userAPI.forgotPassword, action.payload);
    yield put({ type: actions.FORGOT_PASSWORD_SUCCESS, payload: data });
    message.success(
      `Thanks! Please check ${action.payload.email} for a link to reset your password.`,
      8,
    );
  } catch (error) {
    yield put({
      type: actions.FORGOT_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
    message.error('No users found', 8);
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest(actions.FORGOT_PASSWORD_REQUEST, forgotPassword);
}

/*---------------------------------------------------------------------------*/

function* resetPassword(action) {
  try {
    const data = yield call(userAPI.resetPassword, action.payload);
    yield put({ type: actions.RESET_PASSWORD_SUCCESS, payload: data });
    message.success(
      `Password for ${data.data.userName} has been successfully changed`,
      6,
    );
    history.push(`${ROOTPATH.AUTH}/${PATH.SIGN}`);
  } catch (error) {
    yield put({
      type: actions.RESET_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
    message.error('Looks like the link you have followed has expired', 8);
  }
}

export function* resetPasswordSaga() {
  yield takeLatest(actions.RESET_PASSWORD_REQUEST, resetPassword);
}
