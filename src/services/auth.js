import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

// export default {
//   setHeaders: token => {
//     if (token) {
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     } else delete axios.defaults.headers.common.Authorization;
//   },

//   checkTokens: () => {
//     const accessToken = Cookies.get('bdtoken');
//     const refreshToken = Cookies.get('bdrefreshtoken');

//     if (!accessToken || !refreshToken) return false;

//     try {
//       const { exp } = jwtDecode(accessToken);
//       if (exp < Date.now() / 1000) return false;
//     } catch (e) {
//       return false;
//     }

//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//     return true;
//   },
// };

export const setHeaders = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else delete axios.defaults.headers.common.Authorization;
};

export const checkTokens = () => {
  const accessToken = Cookies.get('bdtoken');
  const refreshToken = Cookies.get('bdrefreshtoken');

  if (!accessToken || !refreshToken) {
    localStorage.removeItem('userName');
    return false;
  }

  try {
    const { exp } = jwtDecode(accessToken);
    if (exp < Date.now() / 1000) {
      userLogout();
      return false;
    }
  } catch (e) {
    return false;
  }

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return true;
};

export const clearCookies = () => {
  Cookies.remove('bdtoken');
  Cookies.remove('bdrefreshtoken');
};

export const userLogout = () => {
  clearCookies();
  setHeaders();
  window.location.reload();
  localStorage.removeItem('userName');
};
