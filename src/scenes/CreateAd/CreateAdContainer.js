import { connect } from 'react-redux';
import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';
import { authSelectors } from '@ducks/auth';
import CreateAdDisplay from './CreateAdDisplay';

function mapStateToProps(state, props) {
  return {
    isAuthorized: !!authSelectors.userNameSelector(state),
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
