import history from 'src/services/history';
import { ROOTPATH, PATH } from 'paths';
/* SIGN UP */
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function signupRequest(credentials) {
  return {
    type: SIGNUP_REQUEST,
    payload: credentials,
  };
}

/* LOGIN */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(credentials) {
  return {
    type: LOGIN_REQUEST,
    payload: credentials,
  };
}

/* REQUEST SMS CODE FOR 2FA */
export const SMS_CODE_REQUEST_SUCCESS = 'SMS_CODE_REQUEST_SUCCESS';
export const SMS_CODE_REQUEST_ERROR = 'SMS_CODE_REQUEST_ERROR';
export const SMS_CODE_REQUEST = 'SMS_CODE_REQUEST';
export function smsCodeRequest(phone) {
  return {
    type: SMS_CODE_REQUEST,
    payload: phone,
  };
}

// ------------------------------------------ 2 FACTOR AUTH -----------------------------------
export const TWO_FACTOR_AUTH_REQUEST = 'TWO_FACTOR_AUTH_REQUEST';
export function twoFactorAuthRequest(data) {
  return {
    type: TWO_FACTOR_AUTH_REQUEST,
    payload: data,
  };
}

export const TWO_FACTOR_AUTH_SUCCESS = 'TWO_FACTOR_AUTH_SUCCESS';
export function twoFactorAuthSuccess(user) {
  return {
    type: TWO_FACTOR_AUTH_SUCCESS,
    payload: user,
  };
}

export const TWO_FACTOR_AUTH_ERROR = 'TWO_FACTOR_AUTH_ERROR';
export function twoFactorAuthError(error) {
  return {
    type: TWO_FACTOR_AUTH_ERROR,
    payload: error,
  };
}

// ------------------------------------------ FORGOT PASS -----------------------------------
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export function forgotPasswordRequest(email) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: email,
  };
}

// ------------------------------------------ RESET PASS -----------------------------------
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export function resetPasswordRequest(data) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: data,
  };
}
