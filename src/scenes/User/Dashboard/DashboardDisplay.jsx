import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '@services/history';
import { Tabs } from 'antd';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { ROUTES, pageSizeDashboard } from '@config/constants';
import { CreatedAdsTableContainer } from './components/CreatedAdsTable';
import { ActiveTradesContainer } from './components/ActiveTrades';
import './style.less';

const { TabPane } = Tabs;

const DashboardDisplay = ({ getMyCreatedAdsRequest }) => {
  useEffect(() => {
    getMyCreatedAdsRequest('created');
  }, []);

  const handleChangeTab = tab => {
    switch (tab) {
      case 'CREATED':
        history.push(ROUTES.DASHBOARD[tab]);
        console.log('fetch created trades data');
        break;
      case 'REQUESTS':
        history.push(ROUTES.DASHBOARD[tab]);
        console.log('fetch trade requests');
        break;
      case 'ACTIVE':
        history.push(ROUTES.DASHBOARD[tab]);
        console.log('fetch active trades data');
        break;
      case 'COMPLETED':
        history.push(ROUTES.DASHBOARD[tab]);
        console.log('fetch completed trades data');
        break;
      case 'CANCELED':
        history.push(ROUTES.DASHBOARD[tab]);
        console.log('fetch canceled trades data');
        break;
      default:
        history.push(ROUTES.HOME);
    }
  };
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="dashboard custom-tabs">
          <Tabs defaultActiveKey="CREATED" tabPosition="left" size="small" onChange={handleChangeTab}>
            <TabPane tab="Created ads" key="CREATED">
              <h2 className="dashboard__header">Created ads</h2>
              <CreatedAdsTableContainer withTerms />
            </TabPane>
            <TabPane tab="Trade requests" key="REQUESTS">
              <h2 className="dashboard__header">Trade requests</h2>
              <div>Trade Requests</div>
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
};
export default DashboardDisplay;
