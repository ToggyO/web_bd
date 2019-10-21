import { connect } from 'react-redux';

import SignInFormDisplay from './SignInFormDisplay';

import { authActions, authSelectors } from '@ducks/auth';

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
