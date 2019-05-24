import { connect } from 'react-redux';
import { signupRequest } from '../../../actions';
import SignUpFormDisplay from './SignUpFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
    errors: state.sign.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupRequest(credentials) {
      dispatch(signupRequest(credentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpFormDisplay);
