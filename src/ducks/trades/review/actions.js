import * as types from './types';

export const getReviewByOrderRequest = order => ({
  type: types.GET_REVIEW_BY_ORDER_REQUEST,
  payload: order,
});

export const postReviewRequest = data => ({
  type: types.POST_REVIEW_REQUEST,
  payload: data,
});
