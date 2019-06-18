import * as buyTradesTypes from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function buy(state = initialState, action) {
  switch (action.type) {
    case buyTradesTypes.GET_REQUEST:
      return { ...state, loading: true };
    case buyTradesTypes.GET_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case buyTradesTypes.GET_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
