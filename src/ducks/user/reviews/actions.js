import * as types from './types';

export const getReviewsByUserNameRequest = userName => ({
  type: types.GET_REVIEWS_BY_USERNAME_REQUEST,
  payload: userName,
});

export const getLikesCountByUserNameRequest = userName => ({
  type: types.GET_LIKES_COUNT_BY_USERNAME_REQUEST,
  payload: userName,
});
