import React from 'react';
import { Tabs } from 'antd';
import { AppWrapperContainer } from 'src/scenes/_components/AppWrapper';
import { CreatedTrades } from './components/CreatedTrades';
import { ActiveTrades } from './components/ActiveTrades';
import './style.less';

const { TabPane } = Tabs;

const Dashboard = props =>
  console.log(props) || (
    <AppWrapperContainer>
      <div className="paper">
        <div className="dashboard custom-tabs">
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
      </div>
    </AppWrapperContainer>
  );

export default Dashboard;
