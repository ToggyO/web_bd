import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import ForgotPasswordFormDisplay from './ForgotPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    forgotPasswordRequest(email) {
      dispatch(authActions.forgotPasswordRequest(email));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordFormDisplay);
