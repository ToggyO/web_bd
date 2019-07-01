import * as types from './types';
import history from '@services/history';
import { parseQueryString } from '@utils';

const initialState = parseQueryString(history.location.search);

export default function searchParams(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_DATA_SUBMIT:
      return { ...action.payload };
    case types.TABLE_PAGE_CHANGE:
      return { ...state, page: action.payload };
    case types.TABLE_SORT:
      return { ...state, ...action.payload };
    case types.CLEAN_STATE:
      return {};
    default:
      return state;
  }
}
