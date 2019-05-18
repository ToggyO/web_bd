import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  RESET_USER,
  SMS_CODE_REQUEST_ERROR,
  TWO_FACTOR_AUTH_SUCCESS,
  TWO_FACTOR_AUTH_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './actions';

export default function user(state = {}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
    case SMS_CODE_REQUEST_ERROR:
    case TWO_FACTOR_AUTH_SUCCESS:
    case TWO_FACTOR_AUTH_ERROR:
    case FORGOT_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_ERROR:
      return action.payload;
    case RESET_USER:
      return {};
    default:
      return state;
  }
}
