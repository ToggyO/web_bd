import * as types from './types';

import { getFromLocalState } from '@services/ls';

import { LOCAL_STORAGE_KEYS } from '@config';
const { userName, id } = getFromLocalState(LOCAL_STORAGE_KEYS.USER) || {};
const countryCode = getFromLocalState(LOCAL_STORAGE_KEYS.COUNTRYCODE);

const initialState = {
  data: {
    countryCode,
    user: {
      userName,
      id,
    },
  },
  loading: false,
  code: null,
  error: null,
};

export default function me(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.EDIT_EMAIL_REQUEST:
    case types.EDIT_PHONENUMBER_REQUEST:
    case types.EDIT_PASSWORD_REQUEST:
    case types.EDIT_FULLNAME_REQUEST:
      return { ...state, loading: true, code: null, error: null };
    case types.GET_SMS_CODE_REQUEST:
      return { ...state, code: null, error: null };

    case types.GET_PROFILE_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }

    case types.EDIT_EMAIL_SUCCESS:
    case types.EDIT_PHONENUMBER_SUCCESS:
    case types.EDIT_PASSWORD_SUCCESS:
    case types.EDIT_FULLNAME_SUCCESS: {
      const { code } = action.payload;
      return { ...state, loading: false, code };
    }
    case types.GET_SMS_CODE_SUCCESS: {
      const { code } = action.payload;
      return { ...state, code };
    }
    case types.GET_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case types.GET_SMS_CODE_ERROR: {
      const { code } = action.payload;
      return { ...state, code };
    }
    case types.EDIT_EMAIL_ERROR:
    case types.EDIT_PHONENUMBER_ERROR:
    case types.EDIT_PASSWORD_ERROR:
    case types.EDIT_FULLNAME_ERROR:
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
}
