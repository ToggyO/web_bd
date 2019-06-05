import { connect } from 'react-redux';
import { authActions, authSelectors } from 'src/ducks/auth';
import WelcomeBackFormDisplay from './WelcomeBackFormDisplay';

function mapStateToProps(state) {
  return {
    userName: authSelectors.userNameSelector(state),
    phoneNumber: authSelectors.phoneNumberSelector(state),
    loading: authSelectors.loadingSelector(state),
    errors: authSelectors.errorsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    smsCodeRequest(phone) {
      dispatch(authActions.smsCodeRequest(phone));
    },
    signInWithCode(userNameAndTwoFactorCode) {
      dispatch(authActions.twoFactorAuthRequest(userNameAndTwoFactorCode));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeBackFormDisplay);
