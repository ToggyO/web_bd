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
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export function signInRequest(credentials) {
  return {
    type: SIGNIN_REQUEST,
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

/* REQUEST 2FA */
export const TWO_FACTOR_AUTH_ERROR = 'TWO_FACTOR_AUTH_ERROR';
export const TWO_FACTOR_AUTH_SUCCESS = 'TWO_FACTOR_AUTH_SUCCESS';
export const TWO_FACTOR_AUTH_REQUEST = 'TWO_FACTOR_AUTH_REQUEST';
export function twoFactorAuthRequest(twoFactorCredentials) {
  return {
    type: TWO_FACTOR_AUTH_REQUEST,
    payload: twoFactorCredentials,
  };
}

export function twoFactorAuthSuccess(user) {
  return {
    type: TWO_FACTOR_AUTH_SUCCESS,
    payload: user,
  };
}

export function twoFactorAuthError(error) {
  return {
    type: TWO_FACTOR_AUTH_ERROR,
    payload: error,
  };
}

/* FORGOT PASSWORD */
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export function forgotPasswordRequest(email) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: email,
  };
}

/* RESET PASSWORD */
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export function resetPasswordRequest(data) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: data,
  };
}

/* SETUP ACCOUNT WIZARD */
export const WIZARD_STEP_1 = 'WIZARD_STEP_1';
export const WIZARD_STEP_2 = 'WIZARD_STEP_2';
