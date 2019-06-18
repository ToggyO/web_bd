import React from 'react';
import { Divider } from 'antd';
import { checkTokens } from '@services/auth';
import { AppWrapperContainer } from '../_components/AppWrapper';
import { EasyWayDisplay } from './components/EasyWay';
import { QuickFiltersDisplay } from './components/QuickFilters';
import { BuySellDisplay } from './components/BuySell';
import './style.less';

const HomePageDisplay = () => (
  <AppWrapperContainer>
    <div className="paper home-page">
      {/* {loading && <Spinner global fontSize={30} />} */}
      {checkTokens() ? (
        <>
          <QuickFiltersDisplay />
          <Divider />
          <BuySellDisplay />
        </>
      ) : (
        <>
          <EasyWayDisplay />
          <Divider />
          <QuickFiltersDisplay />
          <Divider />
          <BuySellDisplay />
        </>
      )}
    </div>
  </AppWrapperContainer>
);

export default HomePageDisplay;
