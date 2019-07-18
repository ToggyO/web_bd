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
    case types.GET_PENDING_REQUEST:
      return { ...state, loading: true };
    case types.GET_PENDING_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_PENDING_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
