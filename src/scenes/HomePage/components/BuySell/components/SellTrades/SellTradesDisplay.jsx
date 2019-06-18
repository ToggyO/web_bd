import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonLink } from '@components/ButtonLink';
import { TenTradesSkeleton } from '@components/TenTradesSkeleton';
import { TradesTable } from '@components/TradesTable';

const SellTradesDisplay = ({ getSellTradesRequest, sellTradesData, loading }) => {
  useEffect(() => {
    getSellTradesRequest('type[]=sell');
  }, []);

  return (
    <div className="buy-sell__trades">
      <h2 className="buy-sell__heading">Sell bitcoins</h2>
      {loading ? (
        <TenTradesSkeleton loading={loading} />
      ) : (
        <TradesTable data={sellTradesData} classNames="buy-sell__table" loading={loading} />
      )}
      <ButtonLink>Show more sell trades</ButtonLink>
    </div>
  );
};

SellTradesDisplay.propTypes = {
  loading: PropTypes.bool,
  getSellTradesRequest: PropTypes.func,
  sellTradesData: PropTypes.array,
};

SellTradesDisplay.defaultProps = {
  loading: false,
};
export default SellTradesDisplay;
