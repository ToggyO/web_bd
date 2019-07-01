import { connect } from 'react-redux';
import { userActions } from '@ducks/user';
import { authSelectors } from '@ducks/auth';

import AppWrapperDisplay from './AppWrapperDisplay';

function mapStateToProps(state) {
  return {
    userName: authSelectors.userNameSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserProfileRequest() {
      dispatch(userActions.getUserProfileRequest());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapperDisplay);
