import { connect } from 'react-redux';

import EditEmailFormDisplay from './EditEmailFormDisplay';

import { meActions, meSelectors } from '@ducks/me';

function mapStateToProps(state) {
  return {
    loading: meSelectors.loadingSelector(state),
    errors: meSelectors.errorsSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSmsCodeRequest() {
      dispatch(meActions.getSmsCodeRequest());
    },
    editEmailRequest(smsCodeAndEmail) {
      dispatch(meActions.editEmailRequest(smsCodeAndEmail));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmailFormDisplay);
