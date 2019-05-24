import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../../../actions';
import ForgotPasswordFormDisplay from './ForgotPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
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
