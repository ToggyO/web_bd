import * as globalTypes from './types';
import { tradeTypes } from '../trades/trade';

const initialState = {
  globalLoading: false,
  localLoading: false,
};

export default function _global(state = initialState, action) {
  switch (action.type) {
    case globalTypes.REFRESHING_TOKEN_REQUEST:
      return { ...state, globalLoading: true };
    case globalTypes.REFRESHING_TOKEN_SUCCESS:
    case globalTypes.REFRESHING_TOKEN_ERROR:
      return { ...state, globalLoading: false };

    case tradeTypes.POST_TRADE_REQUEST:
    case tradeTypes.EDIT_TRADE_REQUEST:
      return { ...state, localLoading: true };
    case tradeTypes.POST_TRADE_SUCCESS:
    case tradeTypes.EDIT_TRADE_SUCCESS:
    case tradeTypes.POST_TRADE_ERROR:
    case tradeTypes.EDIT_TRADE_ERROR:
      return { ...state, localLoading: false };
    default:
      return state;
  }
}
