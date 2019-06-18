import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonLink } from '@components/ButtonLink';
import { TenTradesSkeleton } from '@components/TenTradesSkeleton';
import { TradesTable } from '@components/TradesTable';

const BuyTradesDisplay = ({ getBuyTradesRequest, buyTradesData, loading }) => {
  useEffect(() => {
    getBuyTradesRequest('type[]=buy');
  }, []);

  return (
    <div className="buy-sell__trades">
      <h2 className="buy-sell__heading">Buy bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTable data={buyTradesData} classNames="buy-sell__table" loading={loading} />
      )}
      <ButtonLink>Show more buy trades</ButtonLink>
    </div>
  );
};

BuyTradesDisplay.propTypes = {
  loading: PropTypes.bool,
  getBuyTradesRequest: PropTypes.func,
  buyTradesData: PropTypes.array,
};

BuyTradesDisplay.defaultProps = {
  loading: false,
};
export default BuyTradesDisplay;
