import * as types from './types';

const initialState = {
  data: {},
  loading: false,
  code: null,
  error: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.GET_USER_PROFILE_SUCCESS: {
      const { data, code } = action.payload;
      return { ...state, data, loading: false, code };
    }
    case types.GET_USER_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
