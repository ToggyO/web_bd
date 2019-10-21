import { connect } from 'react-redux';

import AdFormDisplay from './AdFormDisplay';

import { authSelectors } from '@ducks/auth';
import { adActions } from '@ducks/ads/ad';
import { adsSelectors } from '@ducks/ads';
import { meSelectors } from '@ducks/me';

function mapStateToProps(state, props) {
  return {
    specificAd: adsSelectors.adSelector(state, props),
    user: authSelectors.userSelector(state),
    loading: state._global.submitting,
    onSubmit: props.onSubmit,
    isCurrency: !!state.ads.ad.data.currency,
    countryData: meSelectors.countryDataSelector(state),
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
