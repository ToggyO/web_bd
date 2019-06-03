import { connect } from 'react-redux';
import { authActions, authSelectors } from 'src/ducks/auth';
import SignUpFormDisplay from './SignUpFormDisplay';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
    errors: authSelectors.errorsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupRequest(credentials) {
      dispatch(authActions.signUpRequest(credentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormDisplay);
