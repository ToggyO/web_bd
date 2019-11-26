import { connect } from 'react-redux';

import UserReviewsDisplay from './UserReviewsDisplay';

import { reviewsSelectors, reviewsActions } from '@ducks/user/reviews';

function mapStateToProps(state) {
  return {
    reviewsData: reviewsSelectors.reviewsDataSelector(state),
    reviewsLoading: reviewsSelectors.reviewsLoadingSelector(state),
    reviewsTotalQuantity: reviewsSelectors.reviewsTotalQuantitySelector(state),
    likesCount: reviewsSelectors.likesCountSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getReviewsByUserNameRequest(userName) {
      dispatch(reviewsActions.getReviewsByUserNameRequest(userName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReviewsDisplay);
