/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import history from '@services/history';
import { ROUTES, pageSize } from '@config/constants';
import { Spinner } from '@components/Spinner';

import { NoData } from './_components/NoData';

import { catchNewLines } from '@utils';

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
      dataSource={adsData}
      pagination={
        withTerms || withPagination
          ? {
            onChange: currentPage => {
              tablePageChange(currentPage);
            },
            defaultCurrent: page,
            current: page || 1,
            pageSize,
            total: totalPages,
            size: window.matchMedia('(max-width: 575px)').matches && 'small',
          }
          : false
      }
      className={classNames}
      loading={{ spinning: loading, indicator: <Spinner /> }}
      locale={{ emptyText: <NoData /> }}
      expandedRowRender={
        withTerms
          ? record => (
            <div className="extra-row">
              <div className="extra-row extra-row__left">
                <Row>
                  <Col xs={24} sm={12} className="viewable768">
                    <div className="extra-row__currency">
                      <span>Trade limits</span>
                      <p>{record.tradeLimit}</p>
                    </div>
                  </Col>

                  <Col xs={24} sm={12} className="viewable-630">
                    <div className="extra-row__currency">
                      <span>Payment method</span>
                      <p>{record.payment}</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="extra-row__currency">
                      <span>Terms of trade</span>
                      <p>{catchNewLines(record.terms)}</p>
                    </div>
                  </Col>
                </Row>
              </div>
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
        render={(text, record) => record.tradeLimit}
        dataIndex="tradeLimit"
        key="tradeLimit"
        sorter={!!history.location.search.includes('currency')}
        sortOrder={field === 'tradeLimit' && order}
        className="hideble-768"
      />
      <Column
        title={() => (
          <span>
            Payment <span className="removable">method</span>
          </span>
        )}
        dataIndex="payment"
        key="payment"
        className="hideble-630"
      />
      <Column
        title={type === 'ads' ? 'User' : `${type.charAt(0).toUpperCase()}${type.slice(1)}er`}
        dataIndex="userName"
        key="userName"
        render={(text, record) => (
          <Link to={`${ROUTES.USERS.ROOT}/${record.userName}`}>{record.userName}</Link>
        )}
      />
      {/* <Column title="Location" dataIndex="location" key="location" /> */}
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
        align="center"
        key="type"
        render={(text, record) => {
          let buyOrSell;
          if (record.type.toLowerCase() === 'buy') {
            buyOrSell = 'Sell';
          }
          if (record.type.toLowerCase() === 'sell') {
            buyOrSell = 'Buy';
          }

          return <Link to={`/ads/${record.order}`}>{buyOrSell}</Link>;
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
      tradeLimit: PropTypes.string,
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
