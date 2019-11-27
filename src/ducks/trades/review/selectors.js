import { createSelector } from 'reselect';

export const specificReviewSelector = createSelector(
  state => state.trades.review.data,
  review => review,
);

export const reviewLoadingSelector = state => state.trades.review.loading;
