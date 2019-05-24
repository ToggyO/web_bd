import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../../actions';
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
      dispatch(resetPasswordRequest(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordFormDisplay);
