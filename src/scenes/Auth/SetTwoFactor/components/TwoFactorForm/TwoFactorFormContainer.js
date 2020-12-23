import { connect } from 'react-redux';

import TwoFactorFormDisplay from './TwoFactorFormDisplay';

import { authActions, authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    user: authSelectors.userSelector(state),
    loading: authSelectors.loadingSelector(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorFormDisplay);
