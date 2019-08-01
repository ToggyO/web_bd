import { connect } from 'react-redux';
import { meActions, meSelectors } from '@ducks/me';
import EditEmailFormDisplay from './EditEmailFormDisplay';

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
