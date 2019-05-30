import { connect } from 'react-redux';
import { authActions } from 'src/ducks/auth';
import SignInFormDisplay from './SignInFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInRequest(credentials) {
      dispatch(authActions.signInRequest(credentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormDisplay);
