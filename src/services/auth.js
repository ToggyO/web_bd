import jwtDecode from 'jwt-decode';

import { getFromLocalState, clearLocalState } from '@services/ls';
import history from '@services/history';
import { LOCAL_STORAGE_KEYS } from '@config';

export const userLogout = () => {
  history.replace('/');
  window.location.reload();
  clearLocalState(LOCAL_STORAGE_KEYS.USER);
  clearLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  clearLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

export const checkTokens = () => {
  const accessToken = getFromLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const refreshToken = getFromLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

  if (!accessToken || !refreshToken) {
    clearLocalState(LOCAL_STORAGE_KEYS.USER);
    clearLocalState(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    clearLocalState(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    localStorage.removeItem('countryCode');
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
