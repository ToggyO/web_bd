import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { TenTradesSkeleton } from '@components/TenTradesSkeleton';
import { TradesTableContainer } from '@scenes/_components/TradesTable';

const TenTradesDisplay = ({ getTradesRequest, loading, type }) => {
  const Type = type.charAt(0).toUpperCase() + type.slice(1);

  useEffect(() => {
    getTradesRequest(`?type[]=${Type}&pageSize=10`);
  }, []);

  return (
    <div className="quick-buy-sell__trades">
      <h2 className="quick-buy-sell__heading">{Type} bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTableContainer type={type} classNames="mb-20" />
      )}
      <Link to={ROUTES.TRADES[type.toUpperCase()]}>Show more {type} trades</Link>
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
