import * as globalTypes from './types';
/* eslint-disable no-underscore-dangle */
const initialState = {
  loading: false,
};

export default function _global(state = initialState, action) {
  switch (action.type) {
    case globalTypes.REFRESHING_TOKEN_REQUEST:
      return { ...state, loading: true };
    case globalTypes.REFRESHING_TOKEN_SUCCESS:
    case globalTypes.REFRESHING_TOKEN_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}
