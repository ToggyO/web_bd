import React from 'react';
import { QuickBuyTradesContainer } from './_components/QuickBuyTrades';
import { QuickSellTradesContainer } from './_components/QuickSellTrades';
import './style.less';

const BuySellDisplay = () => (
  <div className="quick-buy-sell">
    <QuickBuyTradesContainer />
    <QuickSellTradesContainer />
  </div>
);

export default BuySellDisplay;
