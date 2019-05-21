import { createSelector } from 'reselect';

export const signSceneLoadingSelector = createSelector(
  state => state.sign.isLoading,
  isLoading => isLoading,
);

export const registeredStatusSelector = createSelector(
  state => state.sign.data.authInfo && state.sign.data.authInfo.profile.email,
  isRegistered => isRegistered,
);

export const emailConfirmedStatusSelector = createSelector(
  state => state.sign.data.authInfo && state.sign.data.authInfo.profile.emailConfirmed,
  isEmailConfirmed => isEmailConfirmed,
);
export const phoneNumberConfirmedStatusSelector = createSelector(
  state =>
    state.sign.data.authInfo && state.sign.data.authInfo.profile.phoneNumberConfirmed,
  isPhoneNumberConfirmed => isPhoneNumberConfirmed,
);

export const signStageErrorsSelector = createSelector(
  state => state.sign.errors,
  errors => errors,
);
