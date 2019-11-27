/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tabs } from 'antd';

import { UserReviewsContainer } from './_components/UserReviews';

import { AdsTableContainer } from '@scenes/_components/AdsTable';

import history from '@services/history';
import { pageSizeUser } from '@config/constants';
import { catchFromPath } from '@utils';

const { TabPane } = Tabs;

const UserHistoryDisplay = ({
  adsLoading,
  adsTotalQuantity,
  getCreatedAdsRequest,
  reviewsLoading,
  reviewsTotalQuantity,
  getReviewsByUserNameRequest,
  getLikesCountByUserNameRequest,
}) => {
  const [initialAdsLoading, setInitialAdsLoading] = useState(false);

  useEffect(() => {
    setInitialAdsLoading(() => true);
  }, []);

  useEffect(() => {
    if (adsTotalQuantity) setInitialAdsLoading(() => false);
  }, [adsTotalQuantity]);

  return (
    <div className="paper paper--white user__main">
      <Tabs
        defaultActiveKey="1"
        onChange={tabKey => {
          const userName = catchFromPath(history.location.pathname, 'users');
          switch (tabKey) {
            case '1':
              return getCreatedAdsRequest(`?pageSize=${pageSizeUser}&username=${userName}`);
            case '2': {
              getReviewsByUserNameRequest(`${userName}?pageSize=5`);
              getLikesCountByUserNameRequest(userName);
              return void 0;
            }
            default:
              return getCreatedAdsRequest(`?pageSize=${pageSizeUser}&username=${userName}`);
          }
        }}
      >
        <TabPane
          tab={
            <span>
              Ads{' '}
              {adsLoading && initialAdsLoading ? (
                <Icon type="loading" style={{ marginRight: 0, marginLeft: 6 }} />
              ) : (
                <span>({adsTotalQuantity})</span>
              )}
            </span>
          }
          key="1"
        >
          <AdsTableContainer type="ads" withPagination />
        </TabPane>
        <TabPane
          tab={
            <span>
              Reviews{' '}
              {(() => {
                switch (reviewsLoading) {
                  case false: {
                    if (!reviewsTotalQuantity) {
                      return null;
                    }
                    if (reviewsTotalQuantity) {
                      return <span>({reviewsTotalQuantity})</span>;
                    }
                    break;
                  }
                  case true: {
                    if (!reviewsTotalQuantity) {
                      return <Icon type="loading" style={{ marginRight: 0, marginLeft: 6 }} />;
                    }
                    if (reviewsTotalQuantity) {
                      return <span>({reviewsTotalQuantity})</span>;
                    }
                    break;
                  }
                  default:
                    return null;
                }
              })()}
            </span>
          }
          key="2"
        >
          <UserReviewsContainer />
        </TabPane>
      </Tabs>
    </div>
  );
};
UserHistoryDisplay.propTypes = {
  adsLoading: PropTypes.bool,
  adsTotalQuantity: PropTypes.number,
  getCreatedAdsRequest: PropTypes.func,
  reviewsLoading: PropTypes.bool,
  reviewsTotalQuantity: PropTypes.number,
  getReviewsByUserNameRequest: PropTypes.func,
  getLikesCountByUserNameRequest: PropTypes.func,
};

export default UserHistoryDisplay;
