import React from 'react';
import { Table } from 'antd';
import { ButtonLink } from 'src/components/ButtonLink';

import { data } from './data';

const { Column } = Table;

const BuyTradesDisplay = () => (
  <div className="buy-sell__trades">
    <h2 className="buy-sell__heading">Buy bitcoins</h2>
    <Table dataSource={data} pagination={false} className="buy-sell__table">
      <Column title="Transaction limits" dataIndex="transactionLimits" key="transactionLimits" />
      <Column title="Payment method" dataIndex="paymentMethod" key="paymentMethod" />
      <Column title="Seller" dataIndex="seller" key="seller" />
      <Column title="Location" dataIndex="location" key="location" />
      <Column title="Price / BTC" dataIndex="priceBtc" key="priceBtc" />
      <Column title="Action" dataIndex="action" key="action" columnWidth={80} />
    </Table>
    <ButtonLink>Show more buy trades</ButtonLink>
  </div>
);

export default BuyTradesDisplay;
