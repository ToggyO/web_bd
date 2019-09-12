import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { QuickFilterFormContainer } from '@scenes/_components/QuickFilterForm';
import './style.less';

const { TabPane } = Tabs;

const initialState = {
  payment: 'PayPal',
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

QuickFiltersTabsDisplay.propTypes = {
  classNames: PropTypes.string,
};

export default QuickFiltersTabsDisplay;