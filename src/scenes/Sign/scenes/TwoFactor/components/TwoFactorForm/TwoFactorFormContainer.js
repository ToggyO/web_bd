import { connect } from 'react-redux';
import { signSceneLoadingSelector } from 'data/user/selectors';
import { smsCodeRequest, twoFactorAuthRequest } from 'data/user/actions';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    loading: signSceneLoadingSelector(state),
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
