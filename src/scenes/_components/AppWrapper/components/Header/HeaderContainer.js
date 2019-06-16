import { connect } from 'react-redux';
import { authActions } from '@ducks/auth';
import { userProfileSelectors } from '@ducks/user';
import HeaderDisplay from './HeaderDisplay';

function mapStateToProps(state) {
  return {
    userName: Object.prototype.hasOwnProperty.call(localStorage, 'userName') && localStorage.getItem('userName'),
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
