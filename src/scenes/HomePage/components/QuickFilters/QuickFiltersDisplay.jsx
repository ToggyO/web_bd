import React from 'react';
import { Tabs } from 'antd';
import './style.less';
import { BuyFormDisplay } from './components/BuyForm';

const { TabPane } = Tabs;

const QuickFilters = () => (
  <div className="quick-filters">
    <Tabs defaultActiveKey="1" className="bd-tabs quick-filters__tabs">
      <TabPane tab="Quick buy" key="1">
        <BuyFormDisplay />
      </TabPane>
      <TabPane tab="Quick sell" key="2">
        <BuyFormDisplay />
      </TabPane>
    </Tabs>
  </div>
);

export default QuickFilters;
