import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from 'src/ducks/user';
import EditPhoneNumberFormDisplay from './EditPhoneNumberFormDisplay';

function mapStateToProps(state) {
  return {
    errors: userProfileSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editPhoneNumberRequest(phoneNumber) {
      dispatch(userActions.editPhoneNumberRequest(phoneNumber));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPhoneNumberFormDisplay);
