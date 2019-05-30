import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import ResetPasswordFormDisplay from './ResetPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
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
