import { connect } from 'react-redux';
import { signInRequest } from '../../../actions';
import SignInFormDisplay from './SignInFormDisplay';

function mapStateToProps(state) {
  return {
    loading: state.sign.loading,
    errors: state.sign.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInRequest(credentials) {
      dispatch(signInRequest(credentials));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInFormDisplay);
