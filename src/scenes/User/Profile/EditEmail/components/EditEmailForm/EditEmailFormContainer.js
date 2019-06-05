import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from 'src/ducks/user';
import EditEmailFormDisplay from './EditEmailFormDisplay';

function mapStateToProps(state) {
  return {
    errors: userProfileSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSmsCodeRequest() {
      dispatch(userActions.getSmsCodeRequest());
    },
    editEmailRequest(smsCodeAndEmail) {
      dispatch(userActions.editEmailRequest(smsCodeAndEmail));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmailFormDisplay);
