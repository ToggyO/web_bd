/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tabs } from 'antd';

import { AdsTableContainer } from '@scenes/_components/AdsTable';
import history from '@services/history';
import { pageSizeUser } from '@config/constants';
import { catchFromPath } from '@utils';

const { TabPane } = Tabs;

const UserHistoryDisplay = ({
  adsLoading,
  adsTotalQuantity,
  getCreatedAdsRequest,
  tradesQuantity,
  tradesLoading,
  getTradesByUserNameRequest,
  requestsQuantity,
  requestsLoading,
  getRequestsByUserNameRequest,
  adsQuantity,
  getAdsByUserNameRequest,
}) => {
  console.log(adsTotalQuantity);
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
          console.log(tabKey);
          const userName = catchFromPath(history.location.pathname, 'users');
          switch (tabKey) {
            case '1':
              return getCreatedAdsRequest(`?PageSize=${pageSizeUser}&username=${userName}`);
            default:
              return getCreatedAdsRequest(`?PageSize=${pageSizeUser}&username=${userName}`);
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
              {/* {(() => {
                switch (requestsLoading) {
                  case false: {
                    if (!requestsQuantity) {
                      return null;
                    }
                    if (requestsQuantity) {
                      return <span>({requestsQuantity})</span>;
                    }
                    break;
                  }
                  case true: {
                    if (!requestsQuantity) {
                      return <Icon type="loading" style={{ marginRight: 0, marginLeft: 6 }} />;
                    }
                    if (requestsQuantity) {
                      return <span>({requestsQuantity})</span>;
                    }
                    break;
                  }
                  default:
                    return null;
                }
              })()} */}
            </span>
          }
          key="2"
        >
          {/* <RequestsTableContainer /> */}
        </TabPane>
      </Tabs>
    </div>
  );
};
UserHistoryDisplay.propTypes = {
  tradesQuantity: PropTypes.number,
  tradesLoading: PropTypes.bool,
  getTradesByUserNameRequest: PropTypes.func,
  requestsQuantity: PropTypes.number,
  requestsLoading: PropTypes.bool,
  getRequestsByUserNameRequest: PropTypes.func,
  adsQuantity: PropTypes.number,
  adsLoading: PropTypes.bool,
  getAdsByUserNameRequest: PropTypes.func,
};

export default UserHistoryDisplay;
