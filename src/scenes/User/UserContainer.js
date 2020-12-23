import { connect } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import UserDisplay from './UserDisplay';

import { adsActions, adsSelectors } from '@ducks/ads';
import { profileActions, profileSelectors, reviewsActions, reviewsSelectors } from '@ducks/user';

function mapStateToProps(state) {
  return {
    profile: profileSelectors.profileSelector(state),
    loadingProfile: profileSelectors.loadingProfileSelector(state),
    adsData: adsSelectors.dataSelector(state),
    adsTotal: adsSelectors.totalSelector(state),
    loadingAdds: adsSelectors.loadingSelector(state),
    reviewsData: reviewsSelectors.dataSelector(state),
    reviewsTotal: reviewsSelectors.totalSelector(state),
    loadingReviews: reviewsSelectors.loadingSelector(state),
    likesCount: reviewsSelectors.likesCountSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileRequest(userName) {
      dispatch(profileActions.getProfileRequest(userName));
    },
    getAllAdsRequest(params) {
      dispatch(adsActions.getAllRequest(params));
    },
    getReviewsByUserNameRequest(userName, params) {
      dispatch(reviewsActions.getReviewsByUserNameRequest(userName, params));
    },
    getLikesCountByUserNameRequest(userName) {
      dispatch(reviewsActions.getLikesCountByUserNameRequest(userName));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDisplay);
