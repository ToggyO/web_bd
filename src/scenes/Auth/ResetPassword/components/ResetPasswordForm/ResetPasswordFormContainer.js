import { connect } from 'react-redux';

import ResetPasswordFormDisplay from './ResetPasswordFormDisplay';

import { authActions, authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPasswordRequest(data) {
      dispatch(authActions.resetPasswordRequest(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormDisplay);
