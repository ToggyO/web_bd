/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { pageSize } from '@config/constants';
import { NoData } from './_components/NoData';

const { Column } = Table;

const TradesTableDisplay = ({
  queryString,
  type,
  tradesData,
  loading,
  withTerms,
  withPagination,
  totalPages,
  tablePageChange,
  tableSort,
  classNames,
  field,
  order,
  page,
}) => {
  let buyerOrSeller;
  if (type.toLowerCase() === 'buy') buyerOrSeller = 'Seller';
  if (type.toLowerCase() === 'sell') buyerOrSeller = 'Buyer';

  useEffect(() => {
    if (queryString) {
      history.push({ search: queryString });
    }
  });

  return (
    <Table
      expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
      dataSource={tradesData}
      pagination={
        withTerms
          ? {
            onChange: currentPage => {
              tablePageChange(currentPage);
            },
            defaultCurrent: page,
            pageSize,
            total: totalPages,
          }
          : !!withPagination
      }
      className={classNames}
      loading={loading}
      locale={{ emptyText: <NoData /> }}
      expandedRowRender={
        withTerms
          ? record => (
            <div>
              <span style={{ fontWeight: 500 }}>Terms of trade</span>
              <p style={{ marginTop: 10 }}>{record.terms}</p>
            </div>
          )
          : null
      }
      onChange={(p, f, s) => {
        if (Object.keys(s).length > 0) {
          tableSort({ field: s.field, order: s.order });
        } else {
          tableSort({ field: null, order: null });
        }
      }}
    >
      <Column
        title={() => (
          <span>
            Transaction <span className="removable">limits</span>
          </span>
        )}
        render={(text, record) => record.transactionLimit}
        // dataIndex="transactionLimit"
        key="transactionLimit"
        width="25%"
        sorter={withTerms}
        sortOrder={field === 'transactionLimit' && order}
      />
      <Column
        title={() => (
          <span>
            Payment <span className="removable">method</span>
          </span>
        )}
        dataIndex="payment"
        key="payment"
        width="25%"
      />
      <Column
        title={buyerOrSeller}
        dataIndex="userName"
        key="userName"
        render={(text, record) => <a>{record.userName}</a>}
      />
      <Column title="Location" dataIndex="location" key="location" />
      <Column
        title={() => (
          <span>
            Price <span className="removable">/ BTC</span>
          </span>
        )}
        dataIndex="btcPrice"
        key="btcPrice"
        sorter={withTerms}
        sortOrder={field === 'btcPrice' && order}
      />
      <Column
        title="Action"
        dataIndex="type"
        key="type"
        columnWidth={80}
        render={(text, record) => <Link to={`/trades/${record.key}/initiate`}>{record.type}</Link>}
      />
    </Table>
  );
};

TradesTableDisplay.propTypes = {
  queryString: PropTypes.string,
  type: PropTypes.string.isRequired,
  tradesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      transactionLimit: PropTypes.string,
      payment: PropTypes.string,
      userName: PropTypes.string,
      location: PropTypes.string,
      btcPrice: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  withTerms: PropTypes.bool,
  withPagination: PropTypes.bool,
  totalPages: PropTypes.number,
  tablePageChange: PropTypes.func,
  tableSort: PropTypes.func,
  classNames: PropTypes.string,
  field: PropTypes.string,
  order: PropTypes.string,
  page: PropTypes.number,
};

TradesTableDisplay.defaultProps = {
  queryString: '',
  classNames: '',
  loading: false,
  withTerms: false,
  withPagination: false,
  totalPages: null,
};

export default TradesTableDisplay;
