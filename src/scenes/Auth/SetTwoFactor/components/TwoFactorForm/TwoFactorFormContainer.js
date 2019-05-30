import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    smsCodeRequest(phone) {
      dispatch(authActions.smsCodeRequest(phone));
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
