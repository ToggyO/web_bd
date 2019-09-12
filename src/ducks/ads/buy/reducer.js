import * as buyAdsTypes from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function buy(state = initialState, action) {
  switch (action.type) {
    case buyAdsTypes.GET_REQUEST:
      return { ...state, loading: true };
    case buyAdsTypes.GET_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case buyAdsTypes.GET_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
