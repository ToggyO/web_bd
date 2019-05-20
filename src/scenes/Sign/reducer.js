import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SMS_CODE_REQUEST_SUCCESS,
  SMS_CODE_REQUEST_ERROR,
  TWO_FACTOR_AUTH_REQUEST,
  TWO_FACTOR_AUTH_SUCCESS,
  TWO_FACTOR_AUTH_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './actions';

const initialState = { data: {}, isLoading: false, errors: {}, code: null };

export default function sign(state = initialState, action) {
  switch (action.type) {
    // switching loading state for button animation
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case TWO_FACTOR_AUTH_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true };

    // here we getting user authInfo
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    // here we need code 'success' for message.success()
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case SMS_CODE_REQUEST_SUCCESS:
    case TWO_FACTOR_AUTH_SUCCESS:
      return { ...state, isLoading: false, code: action.payload };

    // here we need errors object for message.error()
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
    case SMS_CODE_REQUEST_ERROR:
    case TWO_FACTOR_AUTH_ERROR:
      return { ...state, errors: action.payload, isLoading: false };
    default:
      return state;
  }
}
