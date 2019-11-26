import * as types from './types';

const initialState = {
  data: {
    items: [],
    likesCount: {
      liked: 0,
      disliked: 0,
    },
    page: 0,
    pageSize: 0,
    total: 0,
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
      const data = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          items: data.items,
          page: data.page,
          pageSize: data.pageSize,
          total: data.total,
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
