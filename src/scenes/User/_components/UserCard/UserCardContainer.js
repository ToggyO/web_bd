import { connect } from 'react-redux';

import UserCardDisplay from './UserCardDisplay';

import { profileActions, profileSelectors } from '@ducks/user/profile';

function mapStateToProps(state) {
  return {
    profile: profileSelectors.profileSelector(state),
    loading: profileSelectors.loadingProfileSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileRequest(userName) {
      dispatch(profileActions.getProfileRequest(userName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCardDisplay);
