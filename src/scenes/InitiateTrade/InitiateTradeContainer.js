import { connect } from 'react-redux';
import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';
import InitiateTradeDisplay from './InitiateTradeDisplay';

function mapStateToProps(state) {
  return {
    specificTrade: adsSelectors.adSelector(state, { type: 'ad' }),
    loading: adsSelectors.adsLoadingSelector(state, { type: 'ad' }),
    cachedUserName: state.auth.data.userName,
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
