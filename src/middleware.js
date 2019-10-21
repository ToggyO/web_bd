/* eslint-disable no-unused-vars */
import { authTypes } from '@ducks/auth';
import { writeToLocalState } from '@services/ls';
import { meTypes } from '@ducks/me';
import { globalTypes } from '@ducks/_global';
import { userLogout } from '@services/auth';

import { LOCAL_STORAGE_KEYS } from '@config';

export const saveTokens = store => next => action => {
  if (action.type === authTypes.TWO_FACTOR_AUTH_SUCCESS) {
    const { accessToken, refreshToken } = action.payload.data;
    writeToLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    writeToLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
  return next(action);
};

export const saveUserData = store => next => action => {
  if (action.type === authTypes.SIGNIN_SUCCESS || action.type === authTypes.SIGNUP_SUCCESS) {
    const {
      data: { id, userName, emailConfirmed, phoneNumberConfirmed },
    } = action.payload;
    writeToLocalState(LOCAL_STORAGE_KEYS.USER, { id, userName, emailConfirmed, phoneNumberConfirmed });
  }
  if (action.type === meTypes.GET_PROFILE_SUCCESS) {
    const { user } = action.payload.data;
    const { countryCode } = action.payload.data;
    writeToLocalState(LOCAL_STORAGE_KEYS.USER, user);
    writeToLocalState(LOCAL_STORAGE_KEYS.COUNTRYCODE, countryCode);
  }
  return next(action);
};

export const renewCountryDataOnTokenRefresh = store => next => action => {
  if (action.type === globalTypes.REFRESHING_TOKEN_SUCCESS) {
    store.dispatch({ type: meTypes.GET_PROFILE_REQUEST });
  }

  return next(action);
};

export const clearUserData = store => next => action => {
  if (action.type === authTypes.LOGOUT_REQUEST) {
    userLogout();
  }
  return next(action);
};
