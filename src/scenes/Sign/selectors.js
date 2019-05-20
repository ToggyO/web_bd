import { createSelector } from 'reselect';

export const signSceneLoadingSelector = createSelector(
  state => state.sign.isLoading,
  isLoading => isLoading,
);

export const registeredUserEmailSelector = createSelector(
  state => state.sign.data.email,
  email => email,
);

export const signStageErrorsSelector = createSelector(
  state => state.sign.errors,
  errors => errors,
);
