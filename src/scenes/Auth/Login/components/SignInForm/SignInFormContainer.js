import { connect } from 'react-redux';
import { authActions, authSelectors } from 'src/ducks/auth';
import SignInFormDisplay from './SignInFormDisplay';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
    errors: authSelectors.errorsSelector(state),
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
