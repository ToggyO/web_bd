import { connect } from 'react-redux';

import EditPhoneNumberFormDisplay from './EditPhoneNumberFormDisplay';

import { meActions, meSelectors } from '@ducks/me';

function mapStateToProps(state) {
  return {
    loading: meSelectors.loadingSelector(state),
    errors: meSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editPhoneNumberRequest(phoneNumber) {
      dispatch(meActions.editPhoneNumberRequest(phoneNumber));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPhoneNumberFormDisplay);
