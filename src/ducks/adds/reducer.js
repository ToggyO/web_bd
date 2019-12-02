import { adTypes } from '../ads';

import * as types from './types';

import { smartPagination } from '@utils';

const initialState = {
  data: {
    items: [],
    pagination: {},
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

    case adTypes.TOGGLE_STATUS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.map(item =>
            item.ad.id === action.payload ? { ...item, ad: { ...item.ad, shown: !item.ad.shown } } : item,
          ),
        },
      };
    case adTypes.DELETE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          pagination: smartPagination({
            total: state.data.pagination.total - 1,
            current: state.data.pagination.current,
            pageSize: state.data.pagination.pageSize,
          }),
        },
      };

    default:
      return state;
  }
}
