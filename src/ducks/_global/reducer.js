import * as globalTypes from './types';
import { tradeTypes } from '../trades/trade';
import { transactionTypes } from '../transactions/transaction';

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

    case tradeTypes.POST_TRADE_REQUEST:
    case tradeTypes.EDIT_TRADE_REQUEST:
    case tradeTypes.DELETE_TRADE_REQUEST:
    case transactionTypes.INITIATE_TRANSACTION_REQUEST:
      return { ...state, submitting: true };
    case tradeTypes.POST_TRADE_SUCCESS:
    case tradeTypes.EDIT_TRADE_SUCCESS:
    case tradeTypes.POST_TRADE_ERROR:
    case tradeTypes.EDIT_TRADE_ERROR:
    case tradeTypes.DELETE_TRADE_SUCCESS:
    case tradeTypes.DELETE_TRADE_ERROR:
    case transactionTypes.INITIATE_TRANSACTION_SUCCESS:
    case transactionTypes.INITIATE_TRANSACTION_ERROR:
      return { ...state, submitting: false };
    default:
      return state;
  }
}
