import { connect } from 'react-redux';

import CreateAdDisplay from './CreateAdDisplay';

import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';
import { authSelectors } from '@ducks/auth';

function mapStateToProps(state, props) {
  return {
    user: authSelectors.userSelector(state),
    specificAd: adsSelectors.adSelector(state, props),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createAdRequest(values) {
      dispatch(adActions.createAdRequest(values));
    },
    persistFormState(values) {
      dispatch(adActions.persistFormState(values));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAdDisplay);
