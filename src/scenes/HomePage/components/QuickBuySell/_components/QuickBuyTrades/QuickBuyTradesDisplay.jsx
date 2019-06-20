import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { TenTradesSkeleton } from '@components/TenTradesSkeleton';
import { TradesTable } from '@components/TradesTable';

const QuickBuyTradesDisplay = ({ getBuyTradesRequest, buyTradesData, loading }) => {
  useEffect(() => {
    getBuyTradesRequest('?type[]=Buy');
  }, []);

  return (
    <div className="quick-buy-sell__trades">
      <h2 className="quick-buy-sell__heading">Buy bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTable type="buy" data={buyTradesData} classNames="quick-buy-sell__table" loading={loading} />
      )}
      <Link to={ROUTES.TRADES.BUY_TRADES}>Show more buy trades</Link>
    </div>
  );
};

QuickBuyTradesDisplay.propTypes = {
  loading: PropTypes.bool,
  getBuyTradesRequest: PropTypes.func,
  buyTradesData: PropTypes.array,
};

QuickBuyTradesDisplay.defaultProps = {
  loading: false,
};
export default QuickBuyTradesDisplay;
