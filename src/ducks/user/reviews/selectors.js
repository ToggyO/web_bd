import { createSelector } from 'reselect';

const reviewsSelector = state => state.user.reviews;

export const reviewsTotalQuantitySelector = createSelector([reviewsSelector], reviews => reviews.data.total);
export const reviewsLoadingSelector = createSelector([reviewsSelector], reviews => reviews.loading);
export const reviewsDataSelector = createSelector([reviewsSelector], reviews => reviews.data.items);

export const likesCountSelector = createSelector([reviewsSelector], reviews => reviews.data.likesCount);
