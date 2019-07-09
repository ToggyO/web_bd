import { connect } from 'react-redux';
import { tradesSelectors } from '@ducks/trades';
import { tradeActions } from '@ducks/trades/trade';
import CreatedAdsTableDisplay from './CreatedAdsTableDisplay';

function mapStateToProps(state) {
  return {
    tradesData: tradesSelectors.tradesSelector(state, { type: 'trades' }),
    loading: tradesSelectors.tradeLoadingSelector(state, { type: 'trades' }),
    statusLoading: state.trades.trade.loading,
    submitting: state._global.submitting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTradeRequest(id) {
      dispatch(tradeActions.deleteTradeRequest(id));
    },
    toggleTradeStatusRequest(idWithStatus) {
      dispatch(tradeActions.toggleTradeStatusRequest(idWithStatus));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatedAdsTableDisplay);
