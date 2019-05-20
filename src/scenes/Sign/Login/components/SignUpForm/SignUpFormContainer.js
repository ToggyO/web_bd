import { connect } from 'react-redux';
import { signupRequest } from '../../../actions';
import { signSceneLoadingSelector, signStageErrorsSelector } from '../../../selectors';
import SignUpFormDisplay from './SignUpFormDisplay';

function mapStateToProps(state) {
  return {
    isLoading: signSceneLoadingSelector(state),
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
