import { connect } from 'react-redux';

import HeaderDisplay from './HeaderDisplay';

import { authActions, authSelectors } from '@ducks/auth';
import { searchActions } from '@ducks/ads';

function mapStateToProps(state) {
  return {
    user: authSelectors.userSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logoutRequest(e) {
      e.preventDefault();
      dispatch(authActions.logoutRequest());
    },
    cleanState() {
      dispatch(searchActions.cleanState());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDisplay);
