import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { TradesTable } from '@components/TradesTable';

const SellTradesDisplay = ({ history, getSellTradesRequest, sellTradesData, loading }) => {
  const searchQuery = history.location.search.replace('?', '&');

  useEffect(() => {
    getSellTradesRequest(`?type[]=Sell${searchQuery}`);
  }, []);

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div style={{ padding: 80 }}>
          <h1>Sell bitcoins</h1>
          <TradesTable type="buy" data={sellTradesData} loading={loading} />
        </div>
      </div>
    </AppWrapperContainer>
  );
};

SellTradesDisplay.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }),
  getSellTradesRequest: PropTypes.func,
  sellTradesData: PropTypes.array,
  loading: PropTypes.bool,
};

SellTradesDisplay.defaultProps = {
  history: { location: { search: '' } },
  sellTradesData: [],
  loading: true,
};

export default SellTradesDisplay;
