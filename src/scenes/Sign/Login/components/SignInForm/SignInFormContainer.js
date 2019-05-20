import { connect } from 'react-redux';
import { loginRequest } from '../../../actions';
import { signSceneLoadingSelector, signStageErrorsSelector } from '../../../selectors';
import SignInFormDisplay from './SignInFormDisplay';

function mapStateToProps(state) {
  return {
    isLoading: signSceneLoadingSelector(state),
    errors: signStageErrorsSelector(state),
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
