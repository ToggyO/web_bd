import { connect } from 'react-redux';
import { authActions, authSelectors } from '@ducks/auth';
import ResetPasswordFormDisplay from './ResetPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
    errors: authSelectors.errorsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPasswordRequest(data) {
      dispatch(authActions.resetPasswordRequest(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordFormDisplay);
