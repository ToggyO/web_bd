import * as types from './types';

const initialState = {
  data: {},
  errors: {},
  loading: false,
};

export default function ad(state = initialState, action) {
  switch (action.type) {
    case types.GET_BY_ID_REQUEST:
    case types.TOGGLE_STATUS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BY_ID_SUCCESS:
    case types.TOGGLE_STATUS_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_BY_ID_ERROR:
    case types.TOGGLE_STATUS_ERROR:
      return { ...state, loading: false, errors: action.payload };
    case types.PERSIST_FORM_STATE:
      return { ...state, data: action.payload };

    case types.CREATE_SUCCESS:
    case types.EDIT_SUCCESS:
    case types.CLEAN_FORM_STATE:
      return initialState;
    default:
      return state;
  }
}
