import { connect } from 'react-redux';
import { loginRequest } from 'data/user/actions';
import { signSceneLoadingSelector } from 'data/user/selectors';
import SignInFormDisplay from './SignInFormDisplay';

function mapStateToProps(state) {
  return {
    loading: signSceneLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginRequest(credentials) {
      dispatch(loginRequest(credentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInFormDisplay);
