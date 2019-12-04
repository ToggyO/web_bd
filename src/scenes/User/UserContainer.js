import { connect } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import UserDisplay from './UserDisplay';

import { addsActions, addsSelectors } from '@ducks/adds';
import { profileActions, profileSelectors, reviewsActions, reviewsSelectors } from '@ducks/user';

function mapStateToProps(state) {
  return {
    profile: profileSelectors.profileSelector(state),
    loadingProfile: profileSelectors.loadingProfileSelector(state),
    addsData: addsSelectors.dataSelector(state),
    addsTotal: addsSelectors.totalSelector(state),
    loadingAdds: addsSelectors.loadingSelector(state),
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
      dispatch(addsActions.getAllRequest(params));
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
