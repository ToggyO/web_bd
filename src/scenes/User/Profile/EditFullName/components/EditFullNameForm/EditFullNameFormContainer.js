import { connect } from 'react-redux';
import { userActions, userProfileSelectors } from 'src/ducks/user';
import EditFullNameFormDisplay from './EditFullNameFormDisplay';

function mapStateToProps(state) {
  return {
    errors: userProfileSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editFullNameRequest(fullName) {
      dispatch(userActions.editFullNameRequest(fullName));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFullNameFormDisplay);
