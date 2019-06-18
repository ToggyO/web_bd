import React from 'react';
import { BuyTradesContainer } from './components/BuyTrades';
import { SellTradesContainer } from './components/SellTrades';
import './style.less';

const BuySellDisplay = () => (
  <div className="buy-sell">
    <BuyTradesContainer />
    <SellTradesContainer />
  </div>
);

export default BuySellDisplay;
