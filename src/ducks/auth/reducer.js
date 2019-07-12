import * as types from './types';
/* shape

		data: {
			userName,
			email,
			phoneNumber,
			emailConfirmed,
			phoneNumberConfirmed
		},
		tokens: {
			accessToken,
			accessTokenExpires,
			refreshToken
		},
		loading,
		errors,
		code

*/

const initialState = {
  data: {
    userName: Object.prototype.hasOwnProperty.call(localStorage, 'userName')
      ? localStorage.getItem('userName')
      : null,
  },
  tokens: {},
  loading: false,
  errors: {},
  code: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
    case types.SIGNIN_REQUEST:
    case types.TWO_FACTOR_AUTH_REQUEST:
    case types.FORGOT_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, code: null };

    case types.SMS_CODE_REQUEST:
      return { ...state, code: null };

    case types.SIGNUP_SUCCESS:
    case types.SIGNIN_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }

    case types.SMS_CODE_REQUEST_SUCCESS: {
      const { code } = action.payload;
      return { ...state, loading: false, code };
    }

    case types.TWO_FACTOR_AUTH_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, tokens: data, loading: false, code };
    }

    case types.RESET_PASSWORD_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }

    case types.FORGOT_PASSWORD_SUCCESS: {
      const { code } = action.payload;
      return { ...state, loading: false, code };
    }

    case types.SIGNUP_ERROR:
    case types.SIGNIN_ERROR:
    case types.SMS_CODE_REQUEST_ERROR:
    case types.TWO_FACTOR_AUTH_ERROR:
    case types.FORGOT_PASSWORD_ERROR:
    case types.RESET_PASSWORD_ERROR:
      return { ...state, loading: false, errors: action.payload };

    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
