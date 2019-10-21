import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import history from '@services/history';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
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
      `?pageSize=${pageSize}&type[]=${type}&currency[]=${countryData.currency}&location[]=${countryData.location}${searchQuery}`
    );
  }, []);

  useEffect(() => {
    if (history.location.search) {
      getAdsRequest(`?pageSize=${pageSize}&type[]=${type}${searchQuery}`);
    }
  }, [history.location.search]);

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="ads">
          <h1>{Type} bitcoins</h1>
          <Collapsed>
            <QuickFilterFormContainer
              type={type}
              initialState={initialState}
              defaultCurrency={countryData.currency}
              defaultLocation={countryData.location}
            />
          </Collapsed>
          <AdsTableContainer type={type} withTerms />
        </div>
      </div>
    </AppWrapperContainer>
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
