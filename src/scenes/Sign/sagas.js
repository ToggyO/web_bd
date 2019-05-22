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

function* login(action) {
  try {
    const user = yield call(userAPI.login, action.payload);
    yield put({ type: actions.LOGIN_SUCCESS, payload: user });

    /* keep token in LocalStorage and set Authorization header */
    localStorage.bdToken = user.accessToken;
    setAuthHeaders(user.accessToken);

    /* if user has confirmed his email, then redirect him to set 2fa page */
    // if (user.authInfo.profile.emailConfirmed) {
    //   yield history.push(`${ROOTPATH.AUTH}/${PATH.SET_2FA}`);
    // } else {
    //   /* if not, dispatch signup action which will show him alternate view
    //       from LoginDisplay page with his email address */
    //   yield put({
    //     type: actions.SIGNUP_SUCCESS,
    //     payload: { email: user.authInfo.profile.email },
    //   });
    // }
  } catch (error) {
    console.log(error);
    yield put({ type: actions.LOGIN_ERROR, payload: error.response.data.errors });
  }
}

export function* loginSaga() {
  yield takeLatest(actions.LOGIN_REQUEST, login);
}

/*---------------------------------------------------------------------------*/

function* signup(action) {
  try {
    const data = yield call(userAPI.signup, action.payload);
    yield put({ type: actions.SIGNUP_SUCCESS, payload: data });
    yield history.push(`${ROOTPATH.AUTH}/${PATH.CONFIRM_EMAIL}`);
  } catch (error) {
    yield put({ type: actions.SIGNUP_ERROR, payload: error.response.data.errors });
  }
}

export function* signupSaga() {
  yield takeLatest(actions.SIGNUP_REQUEST, signup);
}

/*---------------------------------------------------------------------------*/

function* smsCodeRequest(action) {
  try {
    const data = yield call(userAPI.smsCodeRequest, action.payload);
    yield put({ type: actions.SMS_CODE_REQUEST_SUCCESS, payload: data });
    yield message.success('The verification code has been sent to your phone!', 8);
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
    yield put({ type: actions.TWO_FACTOR_AUTH_SUCCESS, data });
    yield history.push('/user/dashboard');
    message.success('Success! Two-factor authentication activated');
  } catch (error) {
    yield put({ type: actions.TWO_FACTOR_AUTH_ERROR, error });
    message.error('Security code is not valid. Request a new one', 6);
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
    yield message.success(
      `Thanks! Please check ${action.payload.email} for a link to reset your password`,
      8,
    );
  } catch (error) {
    yield put({
      type: actions.FORGOT_PASSWORD_ERROR,
      payload: error.response.data.errors,
    });
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
