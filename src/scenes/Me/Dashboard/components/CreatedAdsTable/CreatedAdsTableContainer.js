import { connect } from 'react-redux';

import CreatedAdsTableDisplay from './CreatedAdsTableDisplay';

import { adsSelectors } from '@ducks/ads';
import { adActions } from '@ducks/ads/ad';

function mapStateToProps(state) {
  return {
    adsData: adsSelectors.adsSelector(state, { type: 'ads' }),
    loading: adsSelectors.adsLoadingSelector(state, { type: 'ads' }),
    statusLoading: state.ads.ad.loading,
    submitting: state._global.submitting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAdRequest(id) {
      dispatch(adActions.deleteAdRequest(id));
    },
    toggleAdStatusRequest(idWithStatus) {
      dispatch(adActions.toggleAdStatusRequest(idWithStatus));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatedAdsTableDisplay);
