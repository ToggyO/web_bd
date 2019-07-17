import { connect } from 'react-redux';
import { authActions, authSelectors } from '@ducks/auth';
import { searchActions } from '@ducks/ads/search';

import HeaderDisplay from './HeaderDisplay';

function mapStateToProps(state) {
  return {
    userName: authSelectors.userNameSelector(state),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDisplay);
