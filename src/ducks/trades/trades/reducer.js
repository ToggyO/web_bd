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
    case types.GET_CREATED_ADS_REQUEST:
    case types.GET_MY_CREATED_ADS_REQUEST:
    case types.GET_USERS_ADS_REQUEST:
      return { ...state, loading: true };
    case types.GET_CREATED_ADS_SUCCESS:
    case types.GET_MY_CREATED_ADS_SUCCESS:
    case types.GET_USERS_ADS_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_CREATED_ADS_ERROR:
    case types.GET_MY_CREATED_ADS_ERROR:
    case types.GET_USERS_ADS_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
