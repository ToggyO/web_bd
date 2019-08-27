import React from 'react';
import { Tabs, Collapse, Icon } from 'antd';
import './style.less';
import { QuickFilterFormContainer } from '@scenes/_components/QuickFilterForm';
import { getInitialValuesBasedOnNavigatorLanguage } from '@services/navigator';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const initialState = {
  payment: 'PayPal',
  ...getInitialValuesBasedOnNavigatorLanguage(),
};

const QuickFiltersTabs = () => (
  <div className="quick-filters">
    <Collapse
      className="collapse"
      expandIcon={({ isActive }) => <Icon type="caret-down" rotate={isActive ? -180 : 0} />}
    >
      <Panel header={<span className="collapse__header">Show filters</span>}>
        <Tabs defaultActiveKey="1" className="bd-tabs quick-filters__tabs">
          <TabPane tab="Quick buy" key="1">
            <QuickFilterFormContainer type="buy" initialState={initialState} />
          </TabPane>
          <TabPane tab="Quick sell" key="2">
            <QuickFilterFormContainer type="sell" initialState={initialState} />
          </TabPane>
        </Tabs>
      </Panel>
    </Collapse>
    <Tabs defaultActiveKey="1" className="bd-tabs quick-filters__tabs uncollapsed">
      <TabPane tab="Quick buy" key="1">
        <QuickFilterFormContainer type="buy" initialState={initialState} />
      </TabPane>
      <TabPane tab="Quick sell" key="2">
        <QuickFilterFormContainer type="sell" initialState={initialState} />
      </TabPane>
    </Tabs>
  </div>
);

export default QuickFiltersTabs;
