import { connect } from 'react-redux';
import { smsCodeRequest, twoFactorAuthRequest } from '../../../actions';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    smsCodeRequest(phone) {
      dispatch(smsCodeRequest(phone));
    },
    twoFactorAuthRequest(twoFactorCredentials) {
      dispatch(twoFactorAuthRequest(twoFactorCredentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwoFactorFormDisplay);
