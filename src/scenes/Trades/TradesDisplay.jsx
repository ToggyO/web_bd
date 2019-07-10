import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '@services/history';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { QuickFilterFormContainer } from '@scenes/_components/QuickFilterForm';
import { TradesTableContainer } from '@scenes/_components/TradesTable';
import { pageSize } from '@config/constants';
import './style.less';

const TradesDisplay = ({ getTradesRequest, type }) => {
  let initialState;
  let Type;
  if (type === 'sell') Type = 'Buy';
  if (type === 'buy') Type = 'Sell';
  const searchQuery = history.location.search.replace('?', '&');

  if (history.location.state) {
    initialState = history.location.state;
  }

  useEffect(() => {
    getTradesRequest(`?pageSize=${pageSize}&type[]=${type}${searchQuery}`);
  }, [history.location.search]);

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="trades">
          <h1>{Type} bitcoins</h1>
          <QuickFilterFormContainer type={type} initialState={initialState} />
          <TradesTableContainer type={type} withTerms />
        </div>
      </div>
    </AppWrapperContainer>
  );
};

TradesDisplay.propTypes = {
  getTradesRequest: PropTypes.func,
  type: PropTypes.string.isRequired,
};
export default TradesDisplay;
