import React from 'react';
import { Divider } from 'antd';

import { EasyWayDisplay } from './_components/EasyWay';
import { QuickFiltersTabsDisplay } from './_components/QuickFiltersTabs';
import { TenAdsContainer } from './_components/TenAds';

import { Collapsed } from '@scenes/_components/Collapsed';

import { checkTokens } from '@services/auth';
import './style.less';

const HomePageDisplay = () => (
  <div className="paper home-page">
    {!checkTokens() && (
      <>
        <EasyWayDisplay />
        <Divider />
      </>
    )}
    <Collapsed>
      <QuickFiltersTabsDisplay />
    </Collapsed>
    <Divider />
    <div className="quick-buy-sell">
      <TenAdsContainer type="sell" />
      <TenAdsContainer type="buy" />
    </div>
  </div>
);

export default HomePageDisplay;
