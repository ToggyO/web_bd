import React from 'react';
import { Tabs } from 'antd';
import { QuickFilterFormContainer } from '@scenes/_components/QuickFilterForm';

import { getInitialValuesBasedOnNavigatorLanguage } from '@services/navigator';
import './style.less';

const { TabPane } = Tabs;

const initialState = {
  payment: 'PayPal',
  ...getInitialValuesBasedOnNavigatorLanguage(),
};

const QuickFiltersTabsDisplay = ({ classNames }) => (
  <div className={`quick-filters ${classNames}`}>
    <Tabs defaultActiveKey="1" className="bd-tabs quick-filters__tabs">
      <TabPane tab="Quick buy" key="1">
        <QuickFilterFormContainer type="buy" initialState={initialState} />
      </TabPane>
      <TabPane tab="Quick sell" key="2">
        <QuickFilterFormContainer type="sell" initialState={initialState} />
      </TabPane>
    </Tabs>
  </div>
);

export default QuickFiltersTabsDisplay;
