import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    smsCodeRequest(phone) {
      dispatch(authActions.smsCodeRequest(phone));
    },
    twoFactorAuthRequest(twoFactorCredentials) {
      dispatch(authActions.twoFactorAuthRequest(twoFactorCredentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoFactorFormDisplay);
