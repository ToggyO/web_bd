import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import ResetPasswordFormDisplay from './ResetPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
    errors: state.sign.errors,
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
