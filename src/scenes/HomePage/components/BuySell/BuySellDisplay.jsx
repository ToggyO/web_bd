import React from 'react';
import { BuyTradesDisplay } from './components/BuyTrades';
import './style.less';

const BuySellDisplay = () => (
  <div className="buy-sell">
    <BuyTradesDisplay />
    <BuyTradesDisplay />
  </div>
);

export default BuySellDisplay;
