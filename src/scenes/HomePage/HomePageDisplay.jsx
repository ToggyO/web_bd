import React from 'react';
import { Divider } from 'antd';
import { checkTokens } from '@services/auth';
import { AppWrapperContainer } from '../_components/AppWrapper';
import { EasyWayDisplay } from './_components/EasyWay';
import { QuickFiltersTabsDisplay } from './_components/QuickFiltersTabs';
import { TenTradesContainer } from './_components/TenTrades';
import './style.less';

const HomePageDisplay = () => (
  <AppWrapperContainer>
    <div className="paper home-page">
      {!checkTokens() && (
        <>
          <EasyWayDisplay />
          <Divider />
        </>
      )}
      <QuickFiltersTabsDisplay />
      <Divider />
      <div className="quick-buy-sell">
        <TenTradesContainer type="buy" />
        <TenTradesContainer type="sell" />
      </div>
    </div>
  </AppWrapperContainer>
);

export default HomePageDisplay;
