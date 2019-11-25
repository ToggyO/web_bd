import * as types from './types';

const initialState = {
  data: {
    items: [],
  },
  loading: false,
  errors: {},
};

export default function ads(state = initialState, action) {
  switch (action.type) {
    case types.GET_ADS_BY_USERNAME_REQUEST:
      return { ...state, errors: {}, loading: true };
    case types.GET_ADS_BY_USERNAME_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_ADS_BY_USERNAME_ERROR:
      return { ...state, errors: action.payload, loading: false };

    default:
      return state;
  }
}
