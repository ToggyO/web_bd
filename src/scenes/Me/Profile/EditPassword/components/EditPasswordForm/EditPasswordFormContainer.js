import { connect } from 'react-redux';

import EditPasswordFormDisplay from './EditPasswordFormDisplay';

import { meActions, meSelectors } from '@ducks/me';

function mapStateToProps(state) {
  return {
    loading: meSelectors.loadingSelector(state),
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
