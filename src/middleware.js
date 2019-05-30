import Cookies from 'js-cookie';
import { authTypes } from 'src/ducks/auth';
import authService from 'src/services/auth';

// eslint-disable-next-line no-unused-vars
export const saveTokens = store => next => action => {
  if (action.type === authTypes.SIGNIN_SUCCESS) {
    const { accessToken, refreshToken } = action.payload.data;

    Cookies.set('bdtoken', accessToken);
    Cookies.set('bdrefreshtoken', refreshToken);

    authService.setHeaders(accessToken);
    return true;
  }
  return next(action);
};

// eslint-disable-next-line no-unused-vars
export const catchErrors = store => next => action => next(action);
