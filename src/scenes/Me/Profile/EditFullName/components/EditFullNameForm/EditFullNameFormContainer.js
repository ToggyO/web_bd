import { connect } from 'react-redux';

import EditFullNameFormDisplay from './EditFullNameFormDisplay';

import { meActions, meSelectors } from '@ducks/me';

function mapStateToProps(state) {
  return {
    loading: meSelectors.loadingSelector(state),
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
