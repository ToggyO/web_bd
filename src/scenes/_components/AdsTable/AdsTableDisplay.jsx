/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import history from '@services/history';
import { pageSize } from '@config/constants';
import { Spinner } from '@components/Spinner';
import { NoData } from './_components/NoData';

const { Column } = Table;

const AdsTableDisplay = ({
  queryString,
  type,
  adsData,
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
  useEffect(() => {
    if (queryString) {
      history.push({ search: queryString });
    }
  });

  return (
    <Table
      expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
      dataSource={adsData}
      pagination={
        withTerms
          ? {
            onChange: currentPage => {
              tablePageChange(currentPage);
            },
            defaultCurrent: page,
            current: page || 1,
            pageSize,
            total: totalPages,
          }
          : !!withPagination
      }
      className={classNames}
      loading={{ spinning: loading, indicator: <Spinner /> }}
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
            Trade <span className="removable">limits</span>
          </span>
        )}
        render={(text, record) => record.tradeLimits}
        dataIndex="tradeLimits"
        key="tradeLimits"
        width="25%"
        sorter={withTerms}
        sortOrder={field === 'tradeLimits' && order}
      />
      <Column
        title={() => (
          <span>
            Payment <span className="removable">method</span>
          </span>
        )}
        dataIndex="payment"
        key="payment"
        width="22%"
      />
      <Column
        title={type === 'ads' ? 'User' : `${type.charAt(0).toUpperCase()}${type.slice(1)}er`}
        dataIndex="userName"
        key="userName"
        render={(text, record) => <Link to={`/user/${record.userName}`}>{record.userName}</Link>}
      />
      <Column title="Location" dataIndex="location" key="location" />
      <Column
        align="right"
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
        render={(text, record) => {
          let buyOrSell;
          if (record.type.toLowerCase() === 'buy') {
            buyOrSell = 'Sell';
          }
          if (record.type.toLowerCase() === 'sell') {
            buyOrSell = 'Buy';
          }

          return <Link to={`/ads/${record.key}`}>{buyOrSell}</Link>;
        }}
      />
    </Table>
  );
};

AdsTableDisplay.propTypes = {
  queryString: PropTypes.string,
  type: PropTypes.string.isRequired,
  adsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tradeLimits: PropTypes.string,
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

AdsTableDisplay.defaultProps = {
  queryString: '',
  classNames: '',
  loading: false,
  withTerms: false,
  withPagination: false,
  totalPages: null,
};

export default AdsTableDisplay;
