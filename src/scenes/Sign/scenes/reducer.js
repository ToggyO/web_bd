import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  TWO_FACTOR_AUTH_REQUEST,
  TWO_FACTOR_AUTH_SUCCESS,
  TWO_FACTOR_AUTH_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from 'data/user/actions';

export default function loading(state = false, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case TWO_FACTOR_AUTH_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
      return true;
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
    case TWO_FACTOR_AUTH_SUCCESS:
    case TWO_FACTOR_AUTH_ERROR:
    case FORGOT_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_ERROR:
      return false;
    default:
      return state;
  }
}
