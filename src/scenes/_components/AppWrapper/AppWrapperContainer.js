import { connect } from 'react-redux';
import { meActions } from '@ducks/me';
import { authSelectors } from '@ducks/auth';

import AppWrapperDisplay from './AppWrapperDisplay';

function mapStateToProps(state) {
  return {
    userName: authSelectors.userNameSelector(state),
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
