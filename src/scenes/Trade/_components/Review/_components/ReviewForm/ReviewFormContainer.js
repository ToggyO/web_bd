import { connect } from 'react-redux';

import ReviewFormDisplay from './ReviewFormDisplay';

import { reviewActions } from '@ducks/reviews/review';
import { specificReviewSelector } from '@ducks/reviews/selectors';

function mapStateToProps(state) {
  return {
    specificReview: specificReviewSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postReviewRequest(data) {
      dispatch(reviewActions.postReviewRequest(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewFormDisplay);
