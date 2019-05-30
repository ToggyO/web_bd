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
  data: {},
  tokens: {},
  loading: false,
  errors: {},
  code: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
    case types.SIGNIN_REQUEST:
    case types.SMS_CODE_REQUEST:
    case types.TWO_FACTOR_AUTH_REQUEST:
    case types.FORGOT_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, code: null };

    case types.SIGNUP_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }

    case types.SIGNIN_SUCCESS: {
      const { data, code } = action.payload;
      const { authInfo, ...tokens } = data;
      return { ...state, data: authInfo.profile, loading: false, code, tokens };
    }

    case types.SMS_CODE_REQUEST_SUCCESS: {
      const { data } = action.payload;
      return { ...state, loading: false, code: data.code };
    }

    case types.TWO_FACTOR_AUTH_SUCCESS:
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
