import React from 'react';
import { Divider } from 'antd';
import { checkTokens } from '@services/auth';
import { AppWrapperContainer } from '../_components/AppWrapper';
import { EasyWayDisplay } from './components/EasyWay';
import { QuickFiltersDisplay } from './components/QuickFilters';
import { QuickBuySellDisplay } from './components/QuickBuySell';
import './style.less';

const HomePageDisplay = () => (
  <AppWrapperContainer>
    <div className="paper home-page">
      {/* {loading && <Spinner global fontSize={30} />} */}
      {checkTokens() ? (
        <>
          <QuickFiltersDisplay />
          <Divider />
          <QuickBuySellDisplay />
        </>
      ) : (
        <>
          <EasyWayDisplay />
          <Divider />
          <QuickFiltersDisplay />
          <Divider />
          <QuickBuySellDisplay />
        </>
      )}
    </div>
  </AppWrapperContainer>
);

export default HomePageDisplay;
