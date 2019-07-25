import * as types from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function trades(state = initialState, action) {
  switch (action.type) {
    case types.GET_NEW_REQUEST:
    case types.GET_ACTIVE_REQUEST:
      return { ...state, loading: true };
    case types.GET_NEW_SUCCESS:
    case types.GET_ACTIVE_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_NEW_ERROR:
    case types.GET_ACTIVE_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
