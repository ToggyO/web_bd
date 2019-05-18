import { connect } from 'react-redux';
import { forgotPasswordRequest } from 'data/user/actions';
import { signSceneLoadingSelector } from 'data/user/selectors';
import ForgotPasswordFormDisplay from './ForgotPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: signSceneLoadingSelector(state),
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
