import * as types from './types';

// 0 -new
// 1 - depositing
// 2 - in progress
// 3 - fiat sent
// 4 - disputed
// 5 - completed
// 6 - resolved to buyer
// 7 - resolved to seller
// 8 - canceled

export const getNewTradesRequest = () => ({
  type: types.GET_NEW_REQUEST,
  payload: 0,
});

export const getActiveTradesRequest = () => ({
  type: types.GET_ACTIVE_REQUEST,
  payload: '1&status[]=2&status[]=3&status[]=4',
});

export const getCompletedTradesRequest = () => ({
  type: types.GET_COMPLETED_REQUEST,
  payload: '5&status[]=6&status[]=7',
});

export const getCanceledTradesRequest = () => ({
  type: types.GET_CANCELED_REQUEST,
  payload: 8,
});
