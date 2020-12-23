import { connect } from 'react-redux';

import AppWrapperDisplay from './AppWrapperDisplay';

import { meActions, meSelectors } from '@ducks/me';
import { authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    user: authSelectors.userSelector(state),
    countryCode: meSelectors.countryCodeSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileRequest() {
      dispatch(meActions.getProfileRequest());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapperDisplay);
