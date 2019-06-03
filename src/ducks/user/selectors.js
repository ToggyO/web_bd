/* eslint-disable no-prototype-builtins */
import { createSelector } from 'reselect';

export const userNameSelector = createSelector(
  state => state.auth.data,
  state => state.user.data,
  (authState, userState) => {
    if (userState.user) {
      return userState.user.userName;
    }

    if (localStorage.hasOwnProperty('userName')) {
      return localStorage.getItem('userName');
    }
    return undefined;
  }
);

export const verificationStatusSelector = createSelector(
  state => state.user.data.verificationStatus,
  verificationStatus => verificationStatus
);
