import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from '@ducks/user';
import AppWrapperDisplay from './AppWrapperDisplay';

function mapStateToProps(state) {
  return {
    userName: Object.prototype.hasOwnProperty.call(localStorage, 'userName') && localStorage.getItem('userName'),
    loading: state.user.loading,
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
