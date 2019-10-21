import { connect } from 'react-redux';

import TradeDisplay from './TradeDisplay';

import { tradeActions } from '@ducks/trades/trade';
import { chatActions, chatSelectors } from '@ducks/chat';
import { tradesSelectors } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    loading: tradesSelectors.tradeLoadingSelector(state),
    specificTrade: tradesSelectors.tradeSelector(state),
    chatLoading: chatSelectors.chatLoadingSelector(state),
    specificChat: chatSelectors.chatSelector(state),
    submitting: state._global.submitting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTradeByIdRequest(id) {
      dispatch(tradeActions.getTradeByIdRequest(id));
    },
    getChatByIdRequest(id) {
      dispatch(chatActions.getChatByIdRequest(id));
    },
    fiatSentRequest(id) {
      dispatch(tradeActions.fiatSentRequest(id));
    },
    fiatReceivedRequest(id) {
      dispatch(tradeActions.fiatReceivedRequest(id));
    },
    deleteNewTradeRequest(id) {
      dispatch(tradeActions.deleteNewTradeRequest(id));
    },
    cancelTradeRequest(id) {
      dispatch(tradeActions.cancelTradeRequest(id));
    },
    disputeTradeRequest(id) {
      dispatch(tradeActions.disputeTradeRequest(id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeDisplay);
