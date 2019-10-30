import { connect } from 'react-redux';

import DashboardDisplay from './DashboardDisplay';

import { adsActions } from '@ducks/ads/ads';
import { tradesActions } from '@ducks/trades/trades';
import { tradeActions } from '@ducks/trades/trade';
import { tradesSelectors } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    tradesLoading: tradesSelectors.tradesLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyCreatedAdsRequest(params) {
      dispatch(adsActions.getMyCreatedAdsRequest(params));
    },
    getNewTradesRequest(type) {
      dispatch(tradesActions.getNewTradesRequest(type));
    },
    getActiveTradesRequest(type) {
      dispatch(tradesActions.getActiveTradesRequest(type));
    },
    getCompletedTradesRequest(type) {
      dispatch(tradesActions.getCompletedTradesRequest(type));
    },
    getCanceledTradesRequest(type) {
      dispatch(tradesActions.getCanceledTradesRequest(type));
    },
    deleteNewTradeRequest(id) {
      dispatch(tradeActions.deleteNewTradeRequest(id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDisplay);
