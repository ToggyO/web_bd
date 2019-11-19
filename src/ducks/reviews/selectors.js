/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';

export const specificReviewSelector = createSelector(
  state => state.reviews.review.data,
  review => review,
);

export const reviewLoadingSelector = state => state.reviews.review.loading;
