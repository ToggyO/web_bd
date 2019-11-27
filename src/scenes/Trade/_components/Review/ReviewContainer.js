import { connect } from 'react-redux';

import ReviewDisplay from './ReviewDisplay';

import { reviewSelectors, reviewActions } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    reviewLoading: reviewSelectors.reviewLoadingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getReviewByOrderRequest(order) {
      dispatch(reviewActions.getReviewByOrderRequest(order));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDisplay);
