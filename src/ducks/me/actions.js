import * as types from './types';

export const getProfileRequest = () => ({
  type: types.GET_PROFILE_REQUEST,
});

export const getSmsCodeRequest = () => ({
  type: types.GET_SMS_CODE_REQUEST,
});

export const editEmailRequest = smsCodeAndEmail => ({
  type: types.EDIT_EMAIL_REQUEST,
  payload: smsCodeAndEmail,
});

export const editFullNameRequest = fullName => ({
  type: types.EDIT_FULLNAME_REQUEST,
  payload: fullName,
});

export const editPhoneNumberRequest = phoneNumber => ({
  type: types.EDIT_PHONENUMBER_REQUEST,
  payload: phoneNumber,
});

export const editPasswordRequest = oldAndNewPasswords => ({
  type: types.EDIT_PASSWORD_REQUEST,
  payload: oldAndNewPasswords,
});
