import jwtDecode from 'jwt-decode';

import { getFromLocalState, clearLocalState } from '@services/ls';
import history from '@services/history';

import { LOCAL_STORAGE_KEYS } from '@config';

export function userLogout() {
  if (arguments.length) {
    history.replace('/login');
  } else {
    history.replace('/');
  }
  window.location.reload();
  clearLocalState(LOCAL_STORAGE_KEYS.USER);
  clearLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  clearLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  clearLocalState(LOCAL_STORAGE_KEYS.COUNTRYCODE);
}

export const checkTokens = () => {
  const accessToken = getFromLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const refreshToken = getFromLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

  if (!accessToken || !refreshToken) {
    clearLocalState(LOCAL_STORAGE_KEYS.USER);
    clearLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    clearLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    clearLocalState(LOCAL_STORAGE_KEYS.COUNTRYCODE);
    return false;
  }

  try {
    const { exp } = jwtDecode(accessToken);
    if (!exp) {
      userLogout();
      return false;
    }
  } catch (e) {
    userLogout();
    return false;
  }

  return true;
};
