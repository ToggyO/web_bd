import * as types from './types';

const initialState = {
  data: {},
  errors: {},
  loading: false,
};

export default function review(state = initialState, action) {
  switch (action.type) {
    case types.GET_REVIEW_BY_ORDER_REQUEST:
    case types.POST_REVIEW_REQUEST:
      return { ...state, loading: true };
    case types.GET_REVIEW_BY_ORDER_SUCCESS:
    case types.POST_REVIEW_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case types.GET_REVIEW_BY_ORDER_ERROR:
    case types.POST_REVIEW_ERROR:
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
}
