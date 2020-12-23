import { createSelector } from 'reselect';

export const profileSelector = createSelector(
  state => state.user.profile.data,
  profile => {
    let availabilityStatus;
    if (profile.availabilityStatus === 'Active') availabilityStatus = true;
    if (profile.availabilityStatus === 'Blocked') availabilityStatus = false;
    return {
      userName: profile.user.userName,
      registrationDate: profile.createDate,
      availabilityStatus,
    };
  },
);

export const loadingProfileSelector = state => state.user.profile.loading;
