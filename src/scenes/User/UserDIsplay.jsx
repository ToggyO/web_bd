/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { UserHistory } from './UserHistory';

import { UserCard } from '@scenes/_components/UserCard';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';

import history from '@services/history';
import { catchFromPath, formatParamsForParakhnevich } from '@utils/';

import './style.less';

const UserDisplay = ({
  profile,
  loadingProfile,
  getProfileRequest,
  adsData,
  adsTotal,
  loadingAdds,
  getAllAdsRequest,
  reviewsData,
  reviewsTotal,
  loadingReviews,
  likesCount,
  getReviewsByUserNameRequest,
  getLikesCountByUserNameRequest,
}) => {
  const userName = catchFromPath(history.location.pathname, 'users');
  useEffect(() => {
    getProfileRequest(userName);
    getAllAdsRequest({ pageSize: 10, userName });
    getReviewsByUserNameRequest(userName, { pageSize: 5 });
  }, [history.location.search]);

  const onTabChange = tabKey => {
    switch (tabKey) {
      case 'ads':
        return getAllAdsRequest({ pageSize: 10, userName });
      case 'reviews': {
        getReviewsByUserNameRequest(userName, { pageSize: 5 });
        getLikesCountByUserNameRequest(userName);
        return void 0;
      }
      default:
        return getAllAdsRequest({ pageSize: 10, userName });
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    const sorterParams = {};
    if (sorter.field) {
      sorterParams.field = sorter.field;
      sorterParams.order = sorter.order;
    }

    const params = { ...pagination, ...sorterParams, userName };
    getAllAdsRequest(formatParamsForParakhnevich(params));
  };

  const onReviewPageChange = (page, pageSize) => {
    getReviewsByUserNameRequest(userName, formatParamsForParakhnevich({ page, pageSize }));
  };

  return (
    <HelmetWrapper title={`${userName}'s Ads - Bitcoins Direct`} description={`${userName}'s Ads`}>
      <div className="paper">
        <div className="user">
          <UserCard profile={profile} loading={loadingProfile} />
          <UserHistory
            onTabChange={onTabChange}
            adsData={adsData}
            adsTotal={adsTotal}
            loadingAdds={loadingAdds}
            onTableChange={onTableChange}
            reviewsData={reviewsData}
            reviewsTotal={reviewsTotal}
            loadingReviews={loadingReviews}
            likesCount={likesCount}
            onReviewPageChange={onReviewPageChange}
          />
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default UserDisplay;
