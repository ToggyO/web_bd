import React from 'react';
import { Divider } from 'antd';
import { AppWrapperContainer } from '../_components/AppWrapper';
import { EasyWayDisplay } from './components/EasyWay';
import { QuickFiltersDisplay } from './components/QuickFilters';
import { BuySellDisplay } from './components/BuySell';

const HomePageDisplay = () => (
  <AppWrapperContainer>
    <div className="paper">
      <EasyWayDisplay />
      <Divider />
      <QuickFiltersDisplay />
      <Divider />
      <BuySellDisplay />
    </div>
  </AppWrapperContainer>
);

export default HomePageDisplay;
