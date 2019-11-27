import { connect } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import UserDisplay from './UserDisplay';

import { adsActions } from '@ducks/ads';
import { profileActions, reviewsActions } from '@ducks/user';

function mapDispatchToProps(dispatch) {
  return {
    getProfileRequest(userName) {
      dispatch(profileActions.getProfileRequest(userName));
    },
    getCreatedAdsRequest(userName) {
      dispatch(adsActions.getCreatedAdsRequest(userName));
    },
    getReviewsByUserNameRequest(userName) {
      dispatch(reviewsActions.getReviewsByUserNameRequest(userName));
    },
  };
}
export default connect(null, mapDispatchToProps)(UserDisplay);
