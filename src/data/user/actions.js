export const RESET_USER = 'RESET_USER';
export function resetUser() {
  return {
    type: RESET_USER,
  };
}
// ------------------------------------------ SIGN UP ----------------------------------------
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export function signupRequest(credentials) {
  return {
    type: SIGNUP_REQUEST,
    payload: credentials,
  };
}
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
}
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  };
}

// ------------------------------------------ LOGIN ------------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(credentials) {
  return {
    type: LOGIN_REQUEST,
    payload: credentials,
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

// ------------------------------------------ 2 FACTOR GET CODE -----------------------------------
export const SMS_CODE_REQUEST = 'SMS_CODE_REQUEST';
export function smsCodeRequest(phone) {
  return {
    type: SMS_CODE_REQUEST,
    payload: phone,
  };
}

export const SMS_CODE_REQUEST_ERROR = 'SMS_CODE_REQUEST_ERROR';
export function smsCodeRequestError(error) {
  return {
    type: SMS_CODE_REQUEST_ERROR,
    payload: error,
  };
}

// ------------------------------------------ 2 FACTOR AUTH -----------------------------------
export const TWO_FACTOR_AUTH_REQUEST = 'TWO_FACTOR_AUTH_REQUEST';
export function twoFactorAuthRequest(twoFactorCredentials) {
  return {
    type: TWO_FACTOR_AUTH_REQUEST,
    payload: twoFactorCredentials,
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
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export function forgotPasswordRequest(email) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: email,
  };
}

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export function forgotPasswordSuccess(code) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: code,
  };
}

export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export function forgotPasswordError(error) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload: error,
  };
}
