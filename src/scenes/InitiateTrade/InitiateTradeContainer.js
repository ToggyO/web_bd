import { connect } from 'react-redux';

import InitiateTradeDisplay from './InitiateTradeDisplay';

import { adActions, adsSelectors } from '@ducks/ads';
import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    specificTrade: adsSelectors.adSelector(state, { type: 'ad' }),
    loading: adsSelectors.adsLoadingSelector(state, { type: 'ad' }),
    user: authSelectors.userSelector(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAdByIdRequest(id) {
      dispatch(adActions.getAdByIdRequest(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitiateTradeDisplay);
