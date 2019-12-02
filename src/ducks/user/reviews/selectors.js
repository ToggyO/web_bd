import { createSelector } from 'reselect';

const reviewsSelector = state => state.user.reviews;

export const dataSelector = createSelector(
  state => state.user.reviews.data.items,
  state => state.user.reviews.data.pagination,
  (items, pagination) => ({
    items,
    pagination,
  }),
);

export const loadingSelector = state => state.user.reviews.loading;
export const totalSelector = state => state.user.reviews.data.pagination.total;

export const likesCountSelector = createSelector([reviewsSelector], reviews => reviews.data.likesCount);
