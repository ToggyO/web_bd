import { adTypes } from '../ads/ad';
import { tradeTypes } from '../trades/trade';

const initialState = {
  submitting: false,
};

export default function _global(state = initialState, action) {
  switch (action.type) {
    case adTypes.CREATE_REQUEST:
    case adTypes.EDIT_REQUEST:
    case adTypes.DELETE_REQUEST:
    case tradeTypes.INITIATE_REQUEST:
    case tradeTypes.CONFIRM_REQUEST:
    case tradeTypes.FIAT_SENT_REQUEST:
    case tradeTypes.FIAT_RECEIVED_REQUEST:
      return { ...state, submitting: true };

    case adTypes.CREATE_SUCCESS:
    case adTypes.EDIT_SUCCESS:
    case adTypes.CREATE_ERROR:
    case adTypes.EDIT_ERROR:
    case adTypes.DELETE_SUCCESS:
    case adTypes.DELETE_ERROR:
    case tradeTypes.INITIATE_SUCCESS:
    case tradeTypes.INITIATE_ERROR:
    case tradeTypes.CONFIRM_SUCCESS:
    case tradeTypes.CONFIRM_ERROR:
    case tradeTypes.FIAT_SENT_SUCCESS:
    case tradeTypes.FIAT_SENT_ERROR:
    case tradeTypes.FIAT_RECEIVED_SUCCESS:
    case tradeTypes.FIAT_RECEIVED_ERROR:
      return { ...state, submitting: false };
    default:
      return state;
  }
}
