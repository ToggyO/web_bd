import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import history from '@services/history';
import { QuickFilterFormContainer } from '@scenes/_components/QuickFilterForm';
import { AdsTableContainer } from '@scenes/_components/AdsTable';
import { Collapsed } from '@scenes/_components/Collapsed';
import { pageSize } from '@config/constants';
import './style.less';

const AdsDisplay = ({ getAdsRequest, type, countryData }) => {
  let initialState;
  let Type;
  if (type === 'sell') Type = 'Buy';
  if (type === 'buy') Type = 'Sell';
  const searchQuery = history.location.search.replace('?', '&');

  if (history.location.state) {
    initialState = history.location.state;
  }

  useEffect(() => {
    getAdsRequest(
      `?pageSize=${pageSize}&type[]=${type}&currency[]=${countryData.currency}&location[]=${countryData.location}${searchQuery}`,
    );
  }, []);

  useEffect(() => {
    if (history.location.search) {
      getAdsRequest(`?pageSize=${pageSize}&type[]=${type}${searchQuery}`);
    }
  }, [history.location.search]);

  return (
    <HelmetWrapper title={`${Type} Bitcoins - Bitcoins Direct`} description="Change password">
      <div className="paper paper--white">
        <div className="ads">
          <h1>{Type} bitcoins</h1>

          <Collapsed titleWord="filters">
            <QuickFilterFormContainer
              type={type}
              initialState={initialState}
              defaultCurrency={countryData.currency}
              defaultLocation={countryData.location}
              getAdsRequest={getAdsRequest}
            />
          </Collapsed>

          <AdsTableContainer type={type} withTerms />
        </div>
      </div>
    </HelmetWrapper>
  );
};

AdsDisplay.propTypes = {
  getAdsRequest: PropTypes.func,
  type: PropTypes.string.isRequired,
  countryData: PropTypes.shape({
    currency: PropTypes.string,
    location: PropTypes.string,
  }),
};
export default AdsDisplay;
