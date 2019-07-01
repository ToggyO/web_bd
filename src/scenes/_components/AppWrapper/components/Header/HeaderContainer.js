import { connect } from 'react-redux';
import { authActions, authSelectors } from '@ducks/auth';
import { searchParamsActions } from '@ducks/trades/searchParams';

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
      dispatch(searchParamsActions.cleanState());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDisplay);
