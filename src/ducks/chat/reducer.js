import * as types from './types';

const initialState = {
  data: {
    buyer: { user: {} },
    seller: { user: {} },
  },
  errors: {},
  loading: false,
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case types.GET_BY_ID_REQUEST:
      return { ...state, loading: true };
    case types.GET_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_BY_ID_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
