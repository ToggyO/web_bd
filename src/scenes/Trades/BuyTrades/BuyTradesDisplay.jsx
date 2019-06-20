import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { TradesTable } from '@components/TradesTable';

const BuyTradesDisplay = ({ history, getBuyTradesRequest, buyTradesData, loading }) => {
  const searchQuery = history.location.search.replace('?', '&');

  useEffect(() => {
    getBuyTradesRequest(`?type[]=Buy${searchQuery}`);
  }, []);

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div style={{ padding: 80 }}>
          <h1>Buy bitcoins</h1>
          <TradesTable type="buy" data={buyTradesData} loading={loading} />
        </div>
      </div>
    </AppWrapperContainer>
  );
};

BuyTradesDisplay.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }),
  getBuyTradesRequest: PropTypes.func,
  buyTradesData: PropTypes.array,
  loading: PropTypes.bool,
};

BuyTradesDisplay.defaultProps = {
  history: { location: { search: '' } },
  buyTradesData: [],
  loading: true,
};

export default BuyTradesDisplay;
