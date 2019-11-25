/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { NoData } from '@scenes/_components/AdsTable/_components/NoData';

import { Spinner } from '@components/Spinner';

import { formatDate, formatMoney, sortStrings, formatCapitals } from '@utils';

import { ROUTES, confirmData } from '@config/constants';
import { ButtonLink } from '@components/ButtonLink';
import { ShowConfirm } from '@components/ShowConfirm';
import { InitiateDisputeLinkWithModal } from '@scenes/_components/InitiateDisputeLinkWithModal';

const { Column } = Table;

const TradesDashboardTableDisplay = ({ withTerms, tradesData, onDecline, loading }) => (
  <Table
    dataSource={tradesData}
    loading={{ spinning: loading, indicator: <Spinner /> }}
    locale={{ emptyText: <NoData /> }}
    pagination={
      !(tradesData.length < 11) ? { size: window.matchMedia('(max-width: 575px)').matches && 'small' } : false
    }
    expandedRowRender={
      withTerms
        ? record => (
          <div className="extra-row">
            <div className="extra-row__head">
              {(() => {
                switch (record.status) {
                  case 'New':
                    return (
                      <>
                        <Link className="extra-row__view" to={`/trades/${record.order}`}>
                            View request
                        </Link>
                        <ButtonLink
                          onClick={() =>
                            ShowConfirm(
                              record.key,
                              onDecline,
                              { ...confirmData.requests.texts },
                              { ...confirmData.requests.buttons },
                            )
                          }
                        >
                            Decline request
                        </ButtonLink>
                      </>
                    );

                  case 'FiatSent':
                    return (
                      <>
                        <Link className="extra-row__view" to={`/trades/${record.order}`}>
                            View trade
                        </Link>
                        <InitiateDisputeLinkWithModal id={record.key} />
                      </>
                    );

                  case 'Disputed':
                  case 'Completed':
                  case 'Cancelled':
                  case 'Canceled':
                  case 'Resolved':
                    return (
                      <>
                        <Link className="extra-row__view" to={`/trades/${record.order}`}>
                            View trade
                        </Link>
                      </>
                    );

                  default:
                    return (
                      <>
                        <Link className="extra-row__view" to={`/trades/${record.order}`}>
                            View trade
                        </Link>
                      </>
                    );
                }
              })()}
            </div>

            <div className="extra-row extra-row__left">
              <Row>
                <Col xs={12} sm={6} className="viewable-768">
                  <div className="extra-row__location">
                    <span>ID</span>
                    <p>{record.order}</p>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="extra-row__location">
                    <span>Trade status</span>
                    <p className="green-status">{formatCapitals(record.status)}</p>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="extra-row__currency">
                    <span>Date</span>
                    <p>{formatDate(record.createdAt, 'lol')}</p>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="extra-row__currency">
                    <span>Trade limits</span>
                    <p>{record.tradeLimit}</p>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="extra-row__currency">
                    <span>Price/BTC</span>
                    <p>{`${formatMoney(record.btcPrice)} ${record.currency}`}</p>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="extra-row__currency">
                    <span>Location</span>
                    <p>{record.location}</p>
                  </div>
                </Col>
                <Col xs={12} sm={6}>
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
                    <p>{record.terms}</p>
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
      key="key"
      title="ID"
      render={(text, record) => (
        <Link to={`${ROUTES.TRADES.ROOT}/${record.order}`} data-id={record.key}>
          {record.order}
        </Link>
      )}
      dataIndex="order"
      className="hideble-768"
    />
    <Column
      key="tradePartner"
      title="Trade partner"
      render={(text, record) => {
        let user;
        if (record.direction === 'Outgoing') user = record.adOwner;
        if (record.direction === 'Incoming') user = record.tradePartner;
        return <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>;
      }}
      sorter={(a, b) => sortStrings(a.tradePartner, b.tradePartner)}
    />

    <Column
      key="type"
      dataIndex="type"
      title="Type"
      columnWidth={80}
      onFilter={(value, record) => record.type.indexOf(value) === 0}
      filters={[{ text: 'Buy', value: 'Buy' }, { text: 'Sell', value: 'Sell' }]}
      filterMultiple={false}
      className="hideble-420"
    />
    <Column
      key="tradeAmount"
      title="Trade amount"
      render={(text, record) => `${record.amount} BTC`}
      sorter={(a, b) => a.amount - b.amount}
      className="hideble-680"
    />
    <Column
      align="right"
      key="fiat"
      title="Fiat"
      render={(text, record) => `${formatMoney(record.fiat)} ${record.currency}`}
      sorter={(a, b) => a.fiat - b.fiat}
      className="hideble-680"
    />

    <Column
      title="Direction"
      dataIndex="direction"
      render={(text, record) => record.direction}
      onFilter={(value, record) => record.direction.indexOf(value) === 0}
      filters={[{ text: 'Outgoing', value: 'Outgoing' }, { text: 'Incoming', value: 'Incoming' }]}
      filterMultiple={false}
    />
  </Table>
);

TradesDashboardTableDisplay.propTypes = {
  withTerms: PropTypes.bool,
  onDecline: PropTypes.func,
  tradesData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      createdAt: PropTypes.number,
      transactionLimit: PropTypes.string,
      tradePartner: PropTypes.string,
      type: PropTypes.string,
      tradeAmount: PropTypes.number,
      currency: PropTypes.string,
      fiat: PropTypes.number,
      location: PropTypes.string,
      payment: PropTypes.string,
      btcPrice: PropTypes.number,
      terms: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    }),
  ),
  loading: PropTypes.bool,
};

TradesDashboardTableDisplay.defaultProps = {};

export default TradesDashboardTableDisplay;
