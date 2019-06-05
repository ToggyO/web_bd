import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import { userProfileSelectors } from 'src/ducks/user';

import HeaderDisplay from './HeaderDisplay';

function mapStateToProps(state) {
  return {
    userName: userProfileSelectors.userNameSelector(state),
    loading: userProfileSelectors.loadingSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logoutRequest(e) {
      e.preventDefault();
      dispatch(authActions.logoutRequest());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDisplay);
