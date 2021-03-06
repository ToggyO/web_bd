import { connect } from 'react-redux';

import CreateAdDisplay from './CreateAdDisplay';

import { adActions, adSelectors } from '@ducks/ads';

import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    user: authSelectors.userSelector(state),
    specificAd: adSelectors.dataSelector(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdDisplay);
