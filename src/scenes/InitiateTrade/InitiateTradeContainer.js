import { connect } from 'react-redux';

import InitiateTradeDisplay from './InitiateTradeDisplay';

import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';

function mapStateToProps(state) {
  return {
    specificTrade: adsSelectors.adSelector(state, { type: 'ad' }),
    loading: adsSelectors.adsLoadingSelector(state, { type: 'ad' }),
    cachedUserID: localStorage.getItem('userID'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAdByIdRequest(id) {
      dispatch(adActions.getAdByIdRequest(id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateTradeDisplay);
