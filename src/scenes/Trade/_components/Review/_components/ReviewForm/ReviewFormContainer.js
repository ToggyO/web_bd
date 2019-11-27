import { connect } from 'react-redux';

import ReviewFormDisplay from './ReviewFormDisplay';

import { reviewActions, reviewSelectors } from '@ducks/trades';

function mapStateToProps(state) {
  return {
    specificReview: reviewSelectors.specificReviewSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postReviewRequest(data) {
      dispatch(reviewActions.postReviewRequest(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFormDisplay);
