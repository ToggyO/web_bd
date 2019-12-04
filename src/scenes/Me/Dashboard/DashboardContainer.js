import { connect } from 'react-redux';

import DashboardDisplay from './DashboardDisplay';

import { adActions, adsActions, adsSelectors } from '@ducks/ads';

import { tradeActions, tradesActions, tradesSelectors } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    adsData: adsSelectors.dataSelector(state),
    loadingAds: adsSelectors.loadingSelector(state),
    adStatusLoading: state.ads.ad.loading,
    submitting: state._global.submitting,
    tradesLoading: tradesSelectors.tradesLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyAdsRequest(params) {
      dispatch(adsActions.getMyRequest(params));
    },
    deleteAdRequest(id) {
      dispatch(adActions.deleteAdRequest(id));
    },
    toggleAdStatusRequest(idWithStatus) {
      dispatch(adActions.toggleAdStatusRequest(idWithStatus));
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDisplay);
