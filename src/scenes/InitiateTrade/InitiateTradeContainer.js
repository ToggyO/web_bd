import { connect } from 'react-redux';

import InitiateTradeDisplay from './InitiateTradeDisplay';

import { adActions, adSelectors } from '@ducks/ads';
import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    specificTrade: adSelectors.dataSelector(state),
    loading: adSelectors.loadingSelector(state),
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
