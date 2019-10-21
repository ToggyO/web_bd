import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { AppWrapperContainer } from '../../_components/AppWrapper';

import history from '@services/history';
import { AdsTableContainer } from '@scenes/_components/AdsTable';

import { catchFromPath } from '@utils/';

import { pageSizeOtherProfile } from '@config/constants';
import './style.less';

const OtherProfileDisplay = ({ getCreatedAdsRequest }) => {
  const name = catchFromPath(history.location.pathname, 'users');
  useEffect(() => {
    getCreatedAdsRequest(`?PageSize=${pageSizeOtherProfile}&username=${name}`);
  }, [history.location.search]);
  return (
    <AppWrapperContainer>
      <div className="paper other-profile">
        <h2>View ads from {name}</h2>
        <AdsTableContainer type="ads" withPagination />
      </div>
    </AppWrapperContainer>
  );
};

OtherProfileDisplay.propTypes = {
  getCreatedAdsRequest: PropTypes.func,
};

export default OtherProfileDisplay;
