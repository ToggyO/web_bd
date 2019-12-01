import * as types from './types';

const initialState = {
  data: {
    items: [],
  },
  errors: {},
  loading: false,
};

export default function adds(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_REQUEST:
    case types.GET_MY_REQUEST:
      return { ...state, loading: true };
    case types.GET_ALL_SUCCESS:
    case types.GET_MY_SUCCESS:
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
    case types.GET_ALL_ERROR:
    case types.GET_MY_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
}
