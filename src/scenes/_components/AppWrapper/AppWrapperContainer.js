import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from 'src/ducks/user';
import AppWrapperDisplay from './AppWrapperDisplay';

function mapStateToProps(state) {
  return {
    userName: userProfileSelectors.userNameSelector(state),
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
