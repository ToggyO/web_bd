/* eslint-disable no-prototype-builtins */
import { createSelector } from 'reselect';

export const errorsSelector = createSelector(
  state => state.user.errors,
  errors => errors
);

export const fullNameSelector = createSelector(
  state => state.user.data.fullName,
  fullName => fullName
);

export const userNameSelector = createSelector(
  state => state.user.data.user.userName,
  userName => userName
);

export const phoneNumberSelector = createSelector(
  state => state.user.data.user.phoneNumber,
  phoneNumber => phoneNumber
);

export const emailSelector = createSelector(
  state => state.user.data.user.email,
  email => email
);

export const verificationStatusSelector = createSelector(
  state => state.user.data.verificationStatus,
  verificationStatus => verificationStatus
);

export const loadingSelector = createSelector(
  state => state.user.loading,
  loading => loading
);
