import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const { Column } = Table;

export const TradesTable = ({ classNames, data, loading }) => (
  <Table dataSource={data} pagination={false} className={classNames} loading={loading}>
    <Column title="Transaction limits" dataIndex="transactionLimits" key="transactionLimits" width="22%" />
    <Column title="Payment method" dataIndex="paymentMethod" key="paymentMethod" width="25%" />
    <Column title="Buyer" dataIndex="profile" key="profile" render={(text, record) => <a>{record.profile}</a>} />
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

TradesTable.propTypes = {
  classNames: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      transactionLimit: PropTypes.string,
      paymentMethod: PropTypes.string,
      // profile: PropTypes.shape({
      //   user: PropTypes.shape({
      //     userName: PropTypes.string,
      //   }),
      // }),
      location: PropTypes.string,
      btcPrice: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

TradesTable.defaultProps = {
  loading: false,
};
