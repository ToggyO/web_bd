import { connect } from 'react-redux';

import SignUpFormDisplay from './SignUpFormDisplay';

import { authActions, authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupRequest(credentials) {
      dispatch(authActions.signUpRequest(credentials));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormDisplay);
