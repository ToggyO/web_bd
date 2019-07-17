import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { TenTradesSkeleton } from '@scenes/_components/TenTradesSkeleton';
import { TradesTableContainer } from '@scenes/_components/TradesTable';

const TenAdsDisplay = ({ getAdsRequest, loading, type }) => {
  let Type;
  if (type === 'sell') Type = 'Buy';
  if (type === 'buy') Type = 'Sell';

  useEffect(() => {
    getAdsRequest(`?type[]=${type}&pageSize=10`);
  }, []);

  return (
    <div className="quick-buy-sell__ads">
      <h2 className="quick-buy-sell__heading">{Type} bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTableContainer type={type} classNames="mb-20" />
      )}
      <Link to={ROUTES.ADS[Type.toUpperCase()]}>Show more {Type.toLowerCase()} ads</Link>
    </div>
  );
};

TenAdsDisplay.propTypes = {
  loading: PropTypes.bool,
  getAdsRequest: PropTypes.func,
  type: PropTypes.string.isRequired,
};

TenAdsDisplay.defaultProps = {
  loading: false,
};
export default TenAdsDisplay;
