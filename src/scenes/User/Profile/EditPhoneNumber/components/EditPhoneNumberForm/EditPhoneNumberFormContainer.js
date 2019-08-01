import { connect } from 'react-redux';
import { meActions, meSelectors } from '@ducks/me';
import EditPhoneNumberFormDisplay from './EditPhoneNumberFormDisplay';

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
