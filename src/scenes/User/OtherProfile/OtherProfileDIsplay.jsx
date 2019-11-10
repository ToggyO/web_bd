import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { AdsTableContainer } from '@scenes/_components/AdsTable';
import { pageSizeOtherProfile } from '@config/constants';
import history from '@services/history';
import { catchFromPath } from '@utils/';
import './style.less';

const OtherProfileDisplay = ({ getCreatedAdsRequest }) => {
  const name = catchFromPath(history.location.pathname, 'users');
  useEffect(() => {
    getCreatedAdsRequest(`?PageSize=${pageSizeOtherProfile}&username=${name}`);
  }, [history.location.search]);
  return (
    <div className="paper other-profile">
      <h2>View ads from {name}</h2>
      <AdsTableContainer type="ads" withPagination />
    </div>
  );
};

OtherProfileDisplay.propTypes = {
  getCreatedAdsRequest: PropTypes.func,
};

export default OtherProfileDisplay;
