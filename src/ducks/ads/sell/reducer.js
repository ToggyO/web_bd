import * as sellAdsTypes from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function sell(state = initialState, action) {
  switch (action.type) {
    case sellAdsTypes.GET_REQUEST:
      return { ...state, loading: true };
    case sellAdsTypes.GET_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case sellAdsTypes.GET_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
