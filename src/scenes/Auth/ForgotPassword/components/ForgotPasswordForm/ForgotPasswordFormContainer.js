import { connect } from 'react-redux';

import ForgotPasswordFormDisplay from './ForgotPasswordFormDisplay';

import { authActions, authSelectors } from '@ducks/auth';

function mapStateToProps(state) {
  return {
    loading: authSelectors.loadingSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    forgotPasswordRequest(email) {
      dispatch(authActions.forgotPasswordRequest(email));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordFormDisplay);
