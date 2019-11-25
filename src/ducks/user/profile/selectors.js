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
      processingDate: profile.processingDate,
      availabilityStatus,
    };
  },
);

export const loadingProfileSelector = createSelector(
  state => state.user.profile.loading,
  loading => loading,
);
