import { connect } from 'react-redux';

import SettingsDisplay from './SettingsDisplay';

import { meActions, meSelectors } from '@ducks/me';

function mapStateToProps(state) {
  return {
    fullName: meSelectors.fullNameSelector(state),
    userName: meSelectors.userNameSelector(state),
    phoneNumber: meSelectors.phoneNumberSelector(state),
    email: meSelectors.emailSelector(state),
    loading: meSelectors.loadingSelector(state),
    verificationStatus: meSelectors.verificationStatusSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileRequest() {
      dispatch(meActions.getProfileRequest());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsDisplay);
