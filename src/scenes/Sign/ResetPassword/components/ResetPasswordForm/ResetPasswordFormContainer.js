import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../../actions';
import { signSceneLoadingSelector, signStageErrorsSelector } from '../../../selectors';
import ResetPasswordFormDisplay from './ResetPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    isLoading: signSceneLoadingSelector(state),
    errors: signStageErrorsSelector(state),
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
