import * as globalTypes from './types';
import { adTypes } from '../ads/ad';
import { tradeTypes } from '../trades/trade';

const initialState = {
  globalLoading: false,
  submitting: false,
};

export default function _global(state = initialState, action) {
  switch (action.type) {
    case globalTypes.REFRESHING_TOKEN_REQUEST:
      return { ...state, globalLoading: true };

    case globalTypes.REFRESHING_TOKEN_SUCCESS:
    case globalTypes.REFRESHING_TOKEN_ERROR:
      return { ...state, globalLoading: false };

    case adTypes.CREATE_REQUEST:
    case adTypes.EDIT_REQUEST:
    case adTypes.DELETE_REQUEST:
    case tradeTypes.INITIATE_REQUEST:
      return { ...state, submitting: true };

    case adTypes.CREATE_SUCCESS:
    case adTypes.EDIT_SUCCESS:
    case adTypes.CREATE_ERROR:
    case adTypes.EDIT_ERROR:
    case adTypes.DELETE_SUCCESS:
    case adTypes.DELETE_ERROR:
    case tradeTypes.INITIATE_SUCCESS:
    case tradeTypes.INITIATE_ERROR:
      return { ...state, submitting: false };
    default:
      return state;
  }
}
