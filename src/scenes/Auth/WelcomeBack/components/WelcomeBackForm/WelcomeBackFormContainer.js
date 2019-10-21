import { connect } from 'react-redux';

import WelcomeBackFormDisplay from './WelcomeBackFormDisplay';

import { authActions, authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    user: authSelectors.userSelector(state),
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
