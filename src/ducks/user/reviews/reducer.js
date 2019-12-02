import * as types from './types';

const initialState = {
  data: {
    items: [],
    pagination: {},
    likesCount: {
      totalTrades: 0,
      liked: 0,
      disliked: 0,
    },
  },
  errors: {},
  loading: false,
};

export default function reviews(state = initialState, action) {
  switch (action.type) {
    case types.GET_REVIEWS_BY_USERNAME_REQUEST:
    case types.GET_LIKES_COUNT_BY_USERNAME_REQUEST:
      return { ...state, loading: true };

    case types.GET_REVIEWS_BY_USERNAME_SUCCESS: {
      return {
        ...state,
        data: {
          items: action.payload.items,
          pagination: {
            total: action.payload.total,
            current: action.payload.page,
            pageSize: action.payload.pageSize,
          },
        },
        loading: false,
      };
    }

    case types.GET_LIKES_COUNT_BY_USERNAME_SUCCESS:
      return { ...state, data: { ...state.data, likesCount: action.payload }, loading: false };

    case types.GET_REVIEWS_BY_USERNAME_ERROR:
    case types.GET_LIKES_COUNT_BY_USERNAME_ERROR:
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
}
