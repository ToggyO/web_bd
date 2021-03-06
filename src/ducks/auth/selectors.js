import { createSelector } from 'reselect';

import { getFromLocalState } from '@services/ls';

import { LOCAL_STORAGE_KEYS } from '@config';

export const errorsSelector = createSelector(
  state => state.auth.errors,
  errors => errors
);
export const loadingSelector = createSelector(
  state => state.auth.loading,
  loading => loading
);

export const emailConfirmedSelector = createSelector(
  state => state.auth.data.emailConfirmed,
  emailConfirmed => emailConfirmed
);
export const phoneNumberConfirmedSelector = createSelector(
  state => state.auth.data.phoneNumberConfirmed,
  phoneNumberConfirmed => phoneNumberConfirmed
);

export const emailSelector = createSelector(
  state => state.auth.data.email,
  email => email
);

export const userSelector = () => {
  const user = getFromLocalState(LOCAL_STORAGE_KEYS.USER);
  return user || {};
};

export const phoneNumberSelector = createSelector(
  state => state.auth.data.phoneNumber,
  userName => userName
);
