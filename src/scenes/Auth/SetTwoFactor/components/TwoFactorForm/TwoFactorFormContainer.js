import { connect } from 'react-redux';
import { authActions, authSelectors } from 'src/ducks/auth';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    userName: authSelectors.userNameSelector(state),
    loading: authSelectors.loadingSelector(state),
    errors: authSelectors.errorsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    smsCodeRequest(userNameAndPhone) {
      dispatch(authActions.smsCodeRequest(userNameAndPhone));
    },
    twoFactorAuthRequest(data) {
      dispatch(authActions.twoFactorAuthRequest(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorFormDisplay);
