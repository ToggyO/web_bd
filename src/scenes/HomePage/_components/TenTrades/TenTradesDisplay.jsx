import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { TenTradesSkeleton } from '@components/TenTradesSkeleton';
import { TradesTableContainer } from '@scenes/_components/TradesTable';

const TenTradesDisplay = ({ getTradesRequest, loading, type }) => {
  let Type;
  if (type === 'sell') Type = 'Buy';
  if (type === 'buy') Type = 'Sell';

  useEffect(() => {
    getTradesRequest(`?type[]=${type}&pageSize=10`);
  }, []);

  return (
    <div className="quick-buy-sell__trades">
      <h2 className="quick-buy-sell__heading">{Type} bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTableContainer type={type} classNames="mb-20" />
      )}
      <Link to={ROUTES.TRADES[Type.toUpperCase()]}>Show more {Type.toLowerCase()} trades</Link>
    </div>
  );
};

TenTradesDisplay.propTypes = {
  loading: PropTypes.bool,
  getTradesRequest: PropTypes.func,
  type: PropTypes.string.isRequired,
};

TenTradesDisplay.defaultProps = {
  loading: false,
};
export default TenTradesDisplay;
