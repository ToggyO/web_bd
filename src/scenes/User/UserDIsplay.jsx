/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { UserCardContainer } from './_components/UserCard';
import { UserHistoryContainer } from './_components/UserHistory';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { pageSizeUser } from '@config/constants';
import history from '@services/history';
import { catchFromPath } from '@utils/';

import './style.less';

const UserDisplay = ({ getProfileRequest, getCreatedAdsRequest }) => {
  const userName = catchFromPath(history.location.pathname, 'users');
  useEffect(() => {
    getProfileRequest(userName);
    getCreatedAdsRequest(`?PageSize=${pageSizeUser}&username=${userName}`);
  }, [history.location.search]);
  return (
    <HelmetWrapper title={`${userName}'s Ads - Bitcoins Direct`} description={`${userName}'s Ads`}>
      <div className="paper">
        <div className="user">
          <UserCardContainer />
          <UserHistoryContainer />
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default UserDisplay;
