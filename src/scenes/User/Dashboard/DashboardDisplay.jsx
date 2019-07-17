import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '@services/history';
import { Tabs } from 'antd';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ROUTES } from '@config/constants';
import { CreatedAdsTableContainer } from './components/CreatedAdsTable';
import { TradeRequestsTableContainer } from './components/TradeRequestsTable';
import { ActiveTradesContainer } from './components/ActiveTrades';
import { catchFromPath } from '@utils/';
import './style.less';

const { TabPane } = Tabs;

const DashboardDisplay = ({ getMyCreatedAdsRequest, getPendingTransactionsRequest }) => {
  useEffect(() => {
    const path = catchFromPath(history.location.pathname, 'dashboard');
    if (path === 'created' || path === '') getMyCreatedAdsRequest('created');
    if (path === 'requests') getPendingTransactionsRequest('pending');
  }, [history.location.pathname]);

  const handleChangeTab = tab => {
    history.push(ROUTES.DASHBOARD[tab]);

    switch (tab) {
      case 'CREATED':
        getMyCreatedAdsRequest('created');
        break;
      case 'REQUESTS':
        getPendingTransactionsRequest('pending');
        break;
      default:
        getMyCreatedAdsRequest();
    }
  };

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="dashboard custom-tabs">
          <Tabs
            defaultActiveKey={
              catchFromPath(history.location.pathname, 'dashboard').toUpperCase() || 'CREATED'
            }
            tabPosition="left"
            size="small"
            onChange={handleChangeTab}
          >
            <TabPane tab="Created ads" key="CREATED">
              <h2 className="dashboard__header">Created ads</h2>
              <CreatedAdsTableContainer withTerms />
            </TabPane>
            <TabPane tab="Trade requests" key="REQUESTS">
              <h2 className="dashboard__header">Trade requests</h2>
              <TradeRequestsTableContainer withTerms />
            </TabPane>
            <TabPane tab="Active trades" key="ACTIVE">
              <h2 className="dashboard__header">Active trades</h2>
              <ActiveTradesContainer withTerms />
            </TabPane>
            <TabPane tab="Completed trades" key="COMPLETED">
              <h2 className="dashboard__header">Completed trades</h2>
              <div>Completed trades</div>
            </TabPane>
            <TabPane tab="Canceled trades" key="CANCELED">
              <h2 className="dashboard__header">Canceled trades</h2>
              <div>Canceled trades</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

DashboardDisplay.propTypes = {
  getMyCreatedAdsRequest: PropTypes.func,
  getPendingTransactionsRequest: PropTypes.func,
};
export default DashboardDisplay;
