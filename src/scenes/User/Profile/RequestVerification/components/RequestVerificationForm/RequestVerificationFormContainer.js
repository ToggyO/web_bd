import { connect } from 'react-redux';

import RequestVerificationFormDisplay from './RequestVerificationFormDisplay';

import { meActions, meSelectors } from '@ducks/me';

function mapStateToProps(state) {
  return {
    errors: meSelectors.errorsSelector(state),
    verificationStatus: meSelectors.verificationStatusSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    requestVerificationRequest(file) {
      dispatch(meActions.requestVerification(file));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestVerificationFormDisplay);
