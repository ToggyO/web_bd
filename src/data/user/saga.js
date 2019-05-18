import { takeLatest, put, call } from 'redux-saga/effects';
import { PATH } from 'paths';
import history from 'services/history';
import setAuthHeaders from 'services/setAuthHeaders';
import userAPI from './api';
import {
  loginSuccess,
  loginError,
  LOGIN_REQUEST,
  signupSuccess,
  signupError,
  SIGNUP_REQUEST,
  SMS_CODE_REQUEST,
  smsCodeRequestError,
  twoFactorAuthSuccess,
  twoFactorAuthError,
  TWO_FACTOR_AUTH_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  forgotPasswordSuccess,
  forgotPasswordError,
} from './actions';

// login
function* login(action) {
  try {
    const user = yield call(userAPI.login, action.payload);
    yield put(loginSuccess(user));
    localStorage.bdToken = user.accessToken;
    setAuthHeaders(user.accessToken);
    history.push(PATH.getTwoFactorAuth);
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}

// signup
function* signup(action) {
  try {
    const data = yield call(userAPI.signup, action.payload);
    yield put(signupSuccess(data));
  } catch (error) {
    yield put(signupError(error.response.data));
  }
}

export function* signupSaga() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

// request smscode for 2auth
function* smsCodeRequest(action) {
  try {
    yield call(userAPI.smsCodeRequest, action.payload);
  } catch (error) {
    yield put(smsCodeRequestError(error));
  }
}

export function* smsCodeRequestSaga() {
  yield takeLatest(SMS_CODE_REQUEST, smsCodeRequest);
}

// sending 2auth request
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

// sending forgot password request
function* forgotPassword(action) {
  try {
    const data = yield call(userAPI.forgotPassword, action.payload);
    console.log(data);
    yield put(forgotPasswordSuccess(data));
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
}
