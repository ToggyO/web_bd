import * as types from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function ads(state = initialState, action) {
  switch (action.type) {
    case types.GET_CREATED_REQUEST:
    case types.GET_MY_CREATED_REQUEST:
      return { ...state, loading: true };
    case types.GET_CREATED_SUCCESS:
    case types.GET_MY_CREATED_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_CREATED_ERROR:
    case types.GET_MY_CREATED_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
