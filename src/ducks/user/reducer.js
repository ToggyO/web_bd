import * as types from './types';

const initialState = {
  data: {
    user: {},
  },
  loading: false,
  code: null,
  error: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.GET_SMS_CODE_REQUEST:
    case types.EDIT_EMAIL_REQUEST:
    case types.EDIT_PHONENUMBER_REQUEST:
    case types.EDIT_PASSWORD_REQUEST:
      return { ...state, code: null, error: null };

    case types.GET_USER_PROFILE_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }
    case types.GET_SMS_CODE_SUCCESS:
    case types.EDIT_EMAIL_SUCCESS:
    case types.EDIT_PHONENUMBER_SUCCESS:
    case types.EDIT_PASSWORD_SUCCESS: {
      const { code } = action.payload;
      return { ...state, code };
    }
    case types.GET_USER_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case types.GET_SMS_CODE_ERROR: {
      const { code } = action.payload;
      return { ...state, code };
    }
    case types.EDIT_EMAIL_ERROR:
    case types.EDIT_PHONENUMBER_ERROR:
    case types.EDIT_PASSWORD_ERROR:
      return { ...state, errors: action.payload };

    default:
      return state;
  }
}
