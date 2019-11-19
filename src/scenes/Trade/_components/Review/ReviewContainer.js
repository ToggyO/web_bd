import { connect } from 'react-redux';

import ReviewDisplay from './ReviewDisplay';

import { reviewActions } from '@ducks/reviews/review';
import { reviewLoadingSelector } from '@ducks/reviews/selectors';

function mapStateToProps(state) {
  return {
    reviewLoading: reviewLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getReviewByOrderRequest(order) {
      dispatch(reviewActions.getReviewByOrderRequest(order));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewDisplay);
