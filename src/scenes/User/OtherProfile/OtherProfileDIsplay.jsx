import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '@services/history';
import { TradesTableContainer } from '@scenes/_components/TradesTable';
import { catchFromPath } from '@utils/';
import { pageSizeOtherProfile } from '@config/constants';
import { AppWrapperContainer } from '../../_components/AppWrapper';
import './style.less';

const OtherProfileDisplay = ({ getCreatedAdsRequest }) => {
  const name = catchFromPath(history.location.pathname, 'user');
  useEffect(() => {
    getCreatedAdsRequest(`?PageSize=${pageSizeOtherProfile}&username=${name}`);
  }, [history.location.search]);
  return (
    <AppWrapperContainer>
      <div className="paper other-profile">
        <h2>View ads from {name}</h2>
        <TradesTableContainer type="ads" withPagination />
      </div>
    </AppWrapperContainer>
  );
};

OtherProfileDisplay.propTypes = {
  getCreatedAdsRequest: PropTypes.func,
};

export default OtherProfileDisplay;
