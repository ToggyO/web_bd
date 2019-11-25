import { connect } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import UserDisplay from './UserDisplay';

import { adsActions } from '@ducks/ads/ads';
import { profileActions } from '@ducks/user/profile';

function mapDispatchToProps(dispatch) {
  return {
    getProfileRequest(userName) {
      dispatch(profileActions.getProfileRequest(userName));
    },
    getCreatedAdsRequest(userName) {
      dispatch(adsActions.getCreatedAdsRequest(userName));
    },
  };
}
export default connect(null, mapDispatchToProps)(UserDisplay);
