import { connect } from 'react-redux';
import { tradesSelectors } from '@ducks/trades';
import { tradeActions } from '@ducks/trades/trade';
import TradeDisplay from './TradeDisplay';

function mapStateToProps(state) {
  return {
    loading: tradesSelectors.tradeLoadingSelector(state),
    specificTrade: tradesSelectors.tradeSelector(state),
    submitting: state._global.submitting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTradeByIdRequest(id) {
      dispatch(tradeActions.getTradeByIdRequest(id));
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
