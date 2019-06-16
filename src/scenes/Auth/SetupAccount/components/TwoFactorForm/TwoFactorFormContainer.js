import { connect } from 'react-redux';
import { authActions, authSelectors } from '@ducks/auth';
import TwoFactorFormDisplay from './TwoFactorFormDisplay';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
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
