import { connect } from 'react-redux';
import { meActions, meSelectors } from '@ducks/me';
import EditPasswordFormDisplay from './EditPasswordFormDisplay';

function mapStateToProps(state) {
  return {
    errors: meSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editPasswordRequest(oldAndNewPasswords) {
      dispatch(meActions.editPasswordRequest(oldAndNewPasswords));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPasswordFormDisplay);
