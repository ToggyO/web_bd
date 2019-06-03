import React from 'react';
import { PropTypes } from 'prop-types';
import { Divider } from 'antd';
import { Spinner } from './components/Spinner';
import { AppWrapperContainer } from '../_components/AppWrapper';
import { EasyWayDisplay } from './components/EasyWay';
import { QuickFiltersDisplay } from './components/QuickFilters';
import { BuySellDisplay } from './components/BuySell';
import './style.less';

const HomePageDisplay = ({ verificationStatus, loading }) => (
  <AppWrapperContainer>
    <div className="paper home-page">
      {loading && <Spinner />}
      {!loading && !verificationStatus ? (
        <>
          <EasyWayDisplay />
          <Divider />
          <QuickFiltersDisplay />
          <Divider />
          <BuySellDisplay />
        </>
      ) : (
        <>
          <QuickFiltersDisplay />
          <Divider />
          <BuySellDisplay />
        </>
      )}
    </div>
  </AppWrapperContainer>
);

HomePageDisplay.propTypes = {
  verificationStatus: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomePageDisplay;
