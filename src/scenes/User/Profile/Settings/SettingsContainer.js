import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from '@ducks/user';
import SettingsDisplay from './SettingsDisplay';

function mapStateToProps(state) {
  return {
    fullName: userProfileSelectors.fullNameSelector(state),
    userName: userProfileSelectors.userNameSelector(state),
    phoneNumber: userProfileSelectors.phoneNumberSelector(state),
    email: userProfileSelectors.emailSelector(state),
    loading: userProfileSelectors.loadingSelector(state),
    verificationStatus: userProfileSelectors.verificationStatusSelector(state),
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
)(SettingsDisplay);
