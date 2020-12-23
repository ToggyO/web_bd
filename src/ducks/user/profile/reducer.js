import * as types from './types';

const initialState = {
  data: {
    user: {},
  },
  errors: {},
  loading: false,
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return { ...state, loading: true };

    case types.GET_PROFILE_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case types.GET_PROFILE_ERROR:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
}
