import { connect } from 'react-redux';
import { signSceneLoadingSelector } from '../../../selectors';
import { smsCodeRequest, twoFactorAuthRequest } from '../../../actions';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    isLoading: signSceneLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    smsCodeRequest(phone) {
      dispatch(smsCodeRequest(phone));
    },
    twoFactorAuthRequest(data) {
      dispatch(twoFactorAuthRequest(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwoFactorFormDisplay);
