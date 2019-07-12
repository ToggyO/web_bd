import * as types from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.GET_PENDING_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case types.GET_PENDING_TRANSACTIONS_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_PENDING_TRANSACTIONS_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
