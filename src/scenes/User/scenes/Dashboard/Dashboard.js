import React from 'react';
import { Tabs } from 'antd';
import withMarkup from '../../components/withMarkup';
import { CreatedTrades } from './components/CreatedTrades';
import { ActiveTrades } from './components/ActiveTrades';
import './style.less';

const { TabPane } = Tabs;

const Dashboard = () => (
  <div className="dashboard">
    <Tabs defaultActiveKey="1" tabPosition="left" size="small">
      <TabPane tab="Created trades" key="1">
        <CreatedTrades />
      </TabPane>
      <TabPane tab="Active trades" key="2">
        <ActiveTrades />
      </TabPane>
      <TabPane tab="Completed trades" key="3">
        Completed trades
      </TabPane>
      <TabPane tab="Canceled trades" key="4">
        Canceled trades
      </TabPane>
    </Tabs>
  </div>
);

export default withMarkup(Dashboard);