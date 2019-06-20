import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const { Column } = Table;

export const TradesTable = ({ type, classNames, data, loading }) => {
  let buyerOrSeller;
  if (type.toLowerCase() === 'buy') buyerOrSeller = 'Seller';
  if (type.toLowerCase() === 'sell') buyerOrSeller = 'Buyer';

  return (
    <Table dataSource={data} pagination={false} className={classNames} loading={loading}>
      <Column title="Transaction limits" dataIndex="transactionLimits" key="transactionLimits" width="22%" />
      <Column title="Payment method" dataIndex="paymentMethod" key="paymentMethod" width="25%" />
      <Column
        title={buyerOrSeller}
        dataIndex="userName"
        key="userName"
        render={(text, record) => <a>{record.userName}</a>}
      />
      <Column title="Location" dataIndex="location" key="location" />
      <Column title="Price / BTC" dataIndex="btcPrice" key="btcPrice" />
      <Column
        title="Action"
        dataIndex="type"
        key="type"
        columnWidth={80}
        render={(text, record) => <a>{record.type}</a>}
      />
    </Table>
  );
};

TradesTable.propTypes = {
  type: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      transactionLimit: PropTypes.string,
      paymentMethod: PropTypes.string,
      userName: PropTypes.string,
      location: PropTypes.string,
      btcPrice: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

TradesTable.defaultProps = {
  classNames: '',
  loading: false,
};
