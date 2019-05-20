import { message } from 'antd';
import { takeLatest, put, call } from 'redux-saga/effects';
import { PATH } from 'paths';
import history from 'services/history';
import setAuthHeaders from 'services/setAuthHeaders';
import userAPI from 'src/services/api';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SMS_CODE_REQUEST,
  SMS_CODE_REQUEST_SUCCESS,
  SMS_CODE_REQUEST_ERROR,
  twoFactorAuthSuccess,
  twoFactorAuthError,
  TWO_FACTOR_AUTH_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './actions';

/*
worker saga
watcher saga
*/

/*---------------------------------------------------------------------------*/

function* login(action) {
  try {
    const user = yield call(userAPI.login, action.payload);
    yield put({ type: LOGIN_SUCCESS, payload: user });

    /* keep token in LocalStorage and set Authorization header */
    localStorage.bdToken = user.accessToken;
    setAuthHeaders(user.accessToken);

    /* if user has confirmed his email, then redirect him to set 2fa page */
    if (user.authInfo.profile.emailConfirmed) {
      yield history.push(`/auth${PATH.SET_2FA}`);
    } else {
      /* if not, dispatch signup action which will show him alternate view
          from LoginDisplay page with his email address */
      yield put({
        type: SIGNUP_SUCCESS,
        payload: { email: user.authInfo.profile.email },
      });
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error.response.data.errors });
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}

/*---------------------------------------------------------------------------*/

function* signup(action) {
  try {
    const data = yield call(userAPI.signup, action.payload);
    yield put({ type: SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, payload: error.response.data.errors });
  }
}

export function* signupSaga() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

/*---------------------------------------------------------------------------*/

function* smsCodeRequest(action) {
  try {
    const data = yield call(userAPI.smsCodeRequest, action.payload);
    yield put({ type: SMS_CODE_REQUEST_SUCCESS, payload: data });
    yield message.success('The verification code has been sent to your phone!', 8);
  } catch (error) {
    yield put({ type: SMS_CODE_REQUEST_ERROR, payload: error.response.data.errors });
  }
}

export function* smsCodeRequestSaga() {
  yield takeLatest(SMS_CODE_REQUEST, smsCodeRequest);
}

/*---------------------------------------------------------------------------*/

function* twoFactorAuth(action) {
  try {
    const data = yield call(userAPI.twoFactorAuth, action.payload);
    yield put(twoFactorAuthSuccess(data));
  } catch (error) {
    yield put(twoFactorAuthError(error));
  }
}

export function* twoFactorAuthSaga() {
  yield takeLatest(TWO_FACTOR_AUTH_REQUEST, twoFactorAuth);
}

/*---------------------------------------------------------------------------*/

function* forgotPassword(action) {
  try {
    const data = yield call(userAPI.forgotPassword, action.payload);
    yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
    yield message.success(
      `Thanks! Please check ${action.payload.email} for a link to reset your password.`,
      8,
    );
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_ERROR, payload: error.response.data.errors });
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
}

/*---------------------------------------------------------------------------*/

function* resetPassword(action) {
  try {
    const data = yield call(userAPI.resetPassword, action.payload);
    yield put({ type: RESET_PASSWORD_SUCCESS, payload: data });
    message.success(
      `Password for ${data.data.userName} has been successfully changed`,
      6,
    );
    history.push(PATH.HOME);
  } catch (error) {
    yield put({ type: RESET_PASSWORD_ERROR, payload: error.response.data.errors });
    message.error('Looks like the link you have followed has expired', 8);
  }
}

export function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword);
}
