import { connect } from 'react-redux';

import DashboardDisplay from './DashboardDisplay';

import { addsActions, addsSelectors } from '@ducks/adds';
import { adActions } from '@ducks/ads';
import { tradeActions, tradesActions, tradesSelectors } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    adsData: addsSelectors.dataSelector(state),
    loadingAds: addsSelectors.loadingSelector(state),
    adStatusLoading: state.ads.ad.loading,
    submitting: state._global.submitting,
    tradesLoading: tradesSelectors.tradesLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMyAdsRequest(params) {
      dispatch(addsActions.getMyRequest(params));
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
