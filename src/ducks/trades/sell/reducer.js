import * as sellTradesTypes from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function sell(state = initialState, action) {
  switch (action.type) {
    case sellTradesTypes.GET_REQUEST:
      return { ...state, loading: true };
    case sellTradesTypes.GET_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case sellTradesTypes.GET_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
