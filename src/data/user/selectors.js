import { createSelector } from 'reselect';

export const signSceneLoadingSelector = createSelector(
  state => state.scenes.sign.loading,
  loading => loading,
);

export const registeredUserEmailSelector = createSelector(
  state => state.data.user.email,
  email => email,
);

export const signStageErrorsSelector = createSelector(
  state => state.data.user.errors,
  errors => errors,
);
