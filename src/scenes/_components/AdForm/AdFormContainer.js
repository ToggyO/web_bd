import { connect } from 'react-redux';

import AdFormDisplay from './AdFormDisplay';

import { authSelectors } from '@ducks/auth';
import { adActions, adSelectors } from '@ducks/ads';
import { meSelectors } from '@ducks/me';

function mapStateToProps(state, props) {
  return {
    specificAd: adSelectors.dataSelector(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(AdFormDisplay);
