import * as types from './types';

const initialState = {
  data: {
    trade: {
      ad: {},
    },
  },
  errors: {},
  loading: false,
};

export default function trade(state = initialState, action) {
  switch (action.type) {
    case types.GET_BY_ID_REQUEST:
      return { ...state, loading: true };
    case types.GET_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_BY_ID_ERROR:
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
}
