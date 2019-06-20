import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { TenTradesSkeleton } from '@components/TenTradesSkeleton';
import { TradesTable } from '@components/TradesTable';

const QuickSellTradesDisplay = ({ getSellTradesRequest, sellTradesData, loading }) => {
  useEffect(() => {
    getSellTradesRequest('?type[]=Sell');
  }, []);

  return (
    <div className="quick-buy-sell__trades">
      <h2 className="quick-buy-sell__heading">Sell bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTable type="sell" data={sellTradesData} classNames="quick-buy-sell__table" loading={loading} />
      )}
      <Link to={ROUTES.TRADES.SELL_TRADES}>Show more sell trades</Link>
    </div>
  );
};

QuickSellTradesDisplay.propTypes = {
  loading: PropTypes.bool,
  getSellTradesRequest: PropTypes.func,
  sellTradesData: PropTypes.array,
};

QuickSellTradesDisplay.defaultProps = {
  loading: false,
};
export default QuickSellTradesDisplay;
