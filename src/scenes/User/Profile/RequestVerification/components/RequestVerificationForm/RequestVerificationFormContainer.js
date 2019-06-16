import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from '@ducks/user';
import RequestVerificationFormDisplay from './RequestVerificationFormDisplay';

function mapStateToProps(state) {
  return {
    errors: userProfileSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    requestVerificationRequest(file) {
      dispatch(userActions.requestVerification(file));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestVerificationFormDisplay);
