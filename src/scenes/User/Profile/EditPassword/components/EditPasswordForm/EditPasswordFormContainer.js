import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from '@ducks/user';
import EditPasswordFormDisplay from './EditPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    errors: userProfileSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editPasswordRequest(oldAndNewPasswords) {
      dispatch(userActions.editPasswordRequest(oldAndNewPasswords));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPasswordFormDisplay);
