/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import { authTypes } from 'src/ducks/auth';
import { userProfileTypes } from 'src/ducks/user';
import { setHeaders, userLogout } from 'src/services/auth';

export const saveTokens = store => next => action => {
  if (action.type === authTypes.TWO_FACTOR_AUTH_SUCCESS) {
    const { accessToken, refreshToken } = action.payload.data;

    Cookies.set('bdtoken', accessToken);
    Cookies.set('bdrefreshtoken', refreshToken);

    setHeaders(accessToken);
  }
  return next(action);
};

export const logout = store => next => action => {
  if (action.type === authTypes.LOGOUT) {
    userLogout();
  }
  return next(action);
};

export const saveUserName = store => next => action => {
  if (action.type === authTypes.SIGNIN_SUCCESS || action.type === authTypes.SIGNUP_SUCCESS) {
    const { userName } = action.payload.data;

    localStorage.setItem('userName', userName);
  }
  if (action.type === userProfileTypes.GET_USER_PROFILE_SUCCESS) {
    const { userName } = action.payload.data.user;

    localStorage.setItem('userName', userName);
  }
  return next(action);
};
