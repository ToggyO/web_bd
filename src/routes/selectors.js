import { createSelector } from 'reselect';

export const justRegisteredUser = createSelector(
  state => state.sign.data.authInfo && state.sign.data.authInfo.profile.email,
  status => status,
);

export const confirmedUser = createSelector(
  state => state.sign.data.authInfo && state.sign.data.authInfo.profile.emailConfirmed,
  status => status,
);

export const protectedUser = createSelector(
  // state => state.sign.data.authInfo && state.sign.data.authInfo.profile.emailConfirmed,
  state => state.sign.data.authInfo && true,
  status => status,
);
