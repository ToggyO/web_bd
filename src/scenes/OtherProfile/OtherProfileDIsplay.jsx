import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { HelmetWrapper } from './node_modules/@scenes/_components/HelmetWrapper';
import { AdsTableContainer } from './node_modules/@scenes/_components/AdsTable';
import { pageSizeUser } from './node_modules/@config/constants';
import history from './node_modules/@services/history';
import { catchFromPath } from './node_modules/@utils/';
import './style.less';

const UserDisplay = ({ getCreatedAdsRequest }) => {
  const name = catchFromPath(history.location.pathname, 'users');
  useEffect(() => {
    getCreatedAdsRequest(`?PageSize=${pageSizeUser}&username=${name}`);
  }, [history.location.search]);
  return (
    <HelmetWrapper title={`${name}'s Ads - Bitcoins Direct`} description={`${name}'s Ads`}>
      <div className="paper paper--white other-profile">
        <h2>View ads from {name}</h2>
        <AdsTableContainer type="ads" withPagination />
      </div>
    </HelmetWrapper>
  );
};

UserDisplay.propTypes = {
  getCreatedAdsRequest: PropTypes.func,
};

export default UserDisplay;
