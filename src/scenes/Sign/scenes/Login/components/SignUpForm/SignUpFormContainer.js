import { connect } from 'react-redux';
import { signupRequest } from 'data/user/actions';
import { signSceneLoadingSelector, signStageErrorsSelector } from 'data/user/selectors';
import SignUpFormDisplay from './SignUpFormDisplay';

function mapStateToProps(state) {
  return {
    loading: signSceneLoadingSelector(state),
    errors: signStageErrorsSelector(state),
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
