import { connect } from 'react-redux';

import UserHistoryDisplay from './UserHistoryDisplay';

import { adsSelectors, adsActions } from '@ducks/ads';
import { reviewsSelectors, reviewsActions } from '@ducks/user/reviews';

function mapStateToProps(state) {
  return {
    adsData: adsSelectors.adsSelector(state, { type: 'ads' }),
    adsLoading: adsSelectors.adsLoadingSelector(state, { type: 'ads' }),
    adsTotalQuantity: adsSelectors.adsTotalQuantitySelector(state, { type: 'ads' }),
    reviewsTotalQuantity: reviewsSelectors.reviewsTotalQuantitySelector(state),
    reviewsLoading: reviewsSelectors.reviewsLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCreatedAdsRequest(userName) {
      dispatch(adsActions.getCreatedAdsRequest(userName));
    },
    getReviewsByUserNameRequest(userName) {
      dispatch(reviewsActions.getReviewsByUserNameRequest(userName));
    },
    getLikesCountByUserNameRequest(userName) {
      dispatch(reviewsActions.getLikesCountByUserNameRequest(userName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHistoryDisplay);
