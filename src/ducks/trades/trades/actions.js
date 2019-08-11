import * as types from './types';

export const getNewTradesRequest = () => ({
  type: types.GET_NEW_REQUEST,
  payload: 'new',
});

export const getActiveTradesRequest = () => ({
  type: types.GET_ACTIVE_REQUEST,
  payload:
    'pending&status[]=Depositing&status[]=InProgress&status[]=FiatSent&status[]=FiatReceived&status[]=Disputed',
});

export const getCompletedTradesRequest = () => ({
  type: types.GET_COMPLETED_REQUEST,
  payload: 'completed',
});

export const getCanceledTradesRequest = () => ({
  type: types.GET_CANCELED_REQUEST,
  payload: 'canceled',
});
