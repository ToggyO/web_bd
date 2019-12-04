/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { NoData } from '@components/NoData';
import { Spinner } from '@components/Spinner';

import { ROUTES } from '@config';
import { catchNewLines } from '@utils';

const { Column } = Table;

export const AdsTable = ({
  data: { items, pagination },
  loading = false,
  onChange,
  withTerms,
  type,
  classNames = '',
}) => {
  const paginationProps = pagination ? { ...pagination, showLessItems: true } : false;
  return (
    <Table
      onChange={onChange}
      dataSource={items}
      pagination={paginationProps}
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
        sorter={paginationProps}
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
        title={type === 'all' ? 'User' : `${type.charAt(0).toUpperCase()}${type.slice(1)}er`}
        dataIndex="userName"
        key="userName"
        render={(text, record) => (
          <Link to={`${ROUTES.USERS.ROOT}/${record.userName}`}>{record.userName}</Link>
        )}
      />

      <Column
        align="right"
        title={() => (
          <span>
            Price <span className="removable">/ BTC</span>
          </span>
        )}
        dataIndex="btcPrice"
        key="btcPrice"
        sorter={paginationProps}
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

AdsTable.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        order: PropTypes.number,
        createDate: PropTypes.number,
        tradeLimit: PropTypes.string,
        payment: PropTypes.string,
        userName: PropTypes.string,
        location: PropTypes.string,
        btcPrice: PropTypes.string,
        terms: PropTypes.string,
        shown: PropTypes.bool,
        type: PropTypes.string,
      }),
    ),
    pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  withTerms: PropTypes.bool,
  type: PropTypes.string,
  classNames: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};
