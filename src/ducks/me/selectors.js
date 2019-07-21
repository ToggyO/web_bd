/* eslint-disable no-prototype-builtins */
import { createSelector } from 'reselect';

export const errorsSelector = createSelector(
  state => state.me.errors,
  errors => errors
);

export const fullNameSelector = createSelector(
  state => state.me.data.fullName,
  fullName => fullName
);

export const userNameSelector = createSelector(
  state => state.me.data.user.userName,
  userName => userName
);

export const phoneNumberSelector = createSelector(
  state => state.me.data.user.phoneNumber,
  phoneNumber => phoneNumber
);

export const emailSelector = createSelector(
  state => state.me.data.user.email,
  email => email
);

export const verificationStatusSelector = createSelector(
  state => state.me.data.verificationStatus,
  verificationStatus => verificationStatus
);

export const loadingSelector = createSelector(
  state => state.me.loading,
  loading => loading
);
