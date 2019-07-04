import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { pageSizeDashboard } from '@config/constants';
import { CreatedAdsTableContainer } from './components/CreatedAdsTable';
import { ActiveTradesContainer } from './components/ActiveTrades';
import './style.less';

const { TabPane } = Tabs;

const DashboardDisplay = ({ getCreatedAdsRequest }) => {
  useEffect(() => {
    getCreatedAdsRequest(
      `?profileID=f2359e39-f62c-4636-ba4d-67ae5f4335f8&status[]=Created&pageSize=${pageSizeDashboard}`
    );
  }, []);

  const handleChangeTab = tab => {
    switch (tab) {
      case '1':
        console.log('fetch created');
        break;
      case '2':
        console.log('fetch active');
        break;
      case '3':
        console.log('fetch completed');
        break;
      case '4':
        console.log('fetch canceled');
        break;
      default:
        console.log('default case');
    }
  };
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="dashboard custom-tabs">
          <Tabs defaultActiveKey="1" tabPosition="left" size="small" onChange={handleChangeTab}>
            <TabPane tab="Created trades" key="1">
              <h2 className="dashboard__header">Created trades</h2>
              <CreatedAdsTableContainer withTerms />
            </TabPane>
            <TabPane tab="Active trades" key="2">
              <h2 className="dashboard__header">Active trades</h2>
              <ActiveTradesContainer withTerms />
            </TabPane>
            <TabPane tab="Completed trades" key="3">
              Completed trades
            </TabPane>
            <TabPane tab="Canceled trades" key="4">
              Canceled trades
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

DashboardDisplay.propTypes = {
  getCreatedAdsRequest: PropTypes.func,
};
export default DashboardDisplay;
