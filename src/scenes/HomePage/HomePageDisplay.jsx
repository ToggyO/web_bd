import React from 'react';
import { Divider } from 'antd';

import { EasyWayDisplay } from './_components/EasyWay';
import { QuickFiltersTabsDisplay } from './_components/QuickFiltersTabs';
import { TenAdsContainer } from './_components/TenAds';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { Collapsed } from '@scenes/_components/Collapsed';

import { checkTokens } from '@services/auth';
import './style.less';

const HomePageDisplay = () => (
  <HelmetWrapper title="Home - Bitcoins Direct" description="Home page">
    <div className="paper home-page">
      {!checkTokens() && (
        <>
          <HelmetWrapper title="Bitcoins Direct - Join us!" description="Home page">
            <EasyWayDisplay />
            <Divider />
          </HelmetWrapper>
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
  </HelmetWrapper>
);

export default HomePageDisplay;
