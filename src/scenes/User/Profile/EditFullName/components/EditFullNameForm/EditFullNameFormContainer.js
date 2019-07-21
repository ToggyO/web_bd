import { connect } from 'react-redux';
import { meActions, meSelectors } from '@ducks/me';
import EditFullNameFormDisplay from './EditFullNameFormDisplay';

function mapStateToProps(state) {
  return {
    errors: meSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editFullNameRequest(fullName) {
      dispatch(meActions.editFullNameRequest(fullName));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFullNameFormDisplay);
