import { connect } from 'react-redux';
import { authSelectors } from '@ducks/auth';
import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';
import AdFormDisplay from './AdFormDisplay';

function mapStateToProps(state, props) {
  return {
    specificAd: adsSelectors.adSelector(state, props),
    isAuthorized: !!authSelectors.userNameSelector(state),
    loading: state._global.submitting,
    onSubmit: props.onSubmit,
    isCurrency: !!state.ads.ad.data.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cleanFormState() {
      dispatch(adActions.cleanFormState());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdFormDisplay);
