import React, { useState } from 'react';
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

const QuickFiltersTabs = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleChange = () => {
    setCollapsed(prevValue => !prevValue);
  };

  return (
    <div className="quick-filters">
      <Collapse
        onChange={handleChange}
        className="collapse"
        expandIcon={({ isActive }) => <Icon type="down" rotate={isActive ? -180 : 0} />}
      >
        <Panel
          header={<span className="collapse__header">{collapsed ? 'Show filters' : 'Hide filters'}</span>}
        >
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
};

export default QuickFiltersTabs;
