import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../../../actions';
import { signSceneLoadingSelector, signStageErrorsSelector } from '../../../selectors';
import ForgotPasswordFormDisplay from './ForgotPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: signSceneLoadingSelector(state),
    errors: signStageErrorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    forgotPasswordRequest(email) {
      dispatch(forgotPasswordRequest(email));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordFormDisplay);
