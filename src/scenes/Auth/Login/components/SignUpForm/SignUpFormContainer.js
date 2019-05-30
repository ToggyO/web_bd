import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import SignUpFormDisplay from './SignUpFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupRequest(credentials) {
      dispatch(authActions.signupRequest(credentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormDisplay);
