/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Spinner } from '@components/Spinner';
import { NoData } from '@scenes/_components/AdsTable/_components/NoData';
import { formatDate, formatMoney, sortStrings, prettifyId, formatCapitals } from '@utils';
import { ROUTES, confirmData } from '@config/constants';
import { ButtonLink } from '@components/ButtonLink';
import { ShowConfirm } from '@components/ShowConfirm';

const { Column } = Table;

const TradesDashboardTableDisplay = ({ withTerms, tradesData, onDecline, onCancel, loading }) => (
  <Table
    expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
    dataSource={tradesData}
    loading={{ spinning: loading, indicator: <Spinner /> }}
    locale={{ emptyText: <NoData /> }}
    pagination={!(tradesData.length < 11)}
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
                                { ...confirmData.requests.buttons }
                              )
                            }
                          >
                            Decline request
                          </ButtonLink>
                        </>
                    );
                  case 'Depositing':
                  case 'InProgress':
                    return (
                        <>
                          <Link className="extra-row__view" to={`/trades/${record.order}`}>
                            View trade
                          </Link>
                          <ButtonLink
                            onClick={() =>
                              ShowConfirm(
                                record.key,
                                onCancel,
                                { ...confirmData.active.texts },
                                { ...confirmData.active.buttons }
                              )
                            }
                          >
                            Cancel trade
                          </ButtonLink>
                        </>
                    );

                  case 'FiatSent':
                    return (
                        <>
                          <Link className="extra-row__view" to={`/trades/${record.order}`}>
                            View trade
                          </Link>
                          <ButtonLink>Initiate a dispute</ButtonLink>
                        </>
                    );

                  case 'Disputed':
                  case 'Completed':
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
                          <ButtonLink
                            onClick={() =>
                              ShowConfirm(
                                record.key,
                                onCancel,
                                {
                                  title: 'You\'re about to cancel this trade request',
                                  content: 'Cancel trade yo yo yo',
                                },
                                {
                                  okText: 'Cancel it',
                                  cancelText: 'Keep it',
                                }
                              )
                            }
                          >
                            Cancel trade
                          </ButtonLink>
                        </>
                    );
                }
              })()}
            </div>

            <div className="extra-row extra-row__left">
              <Row>
                <Col lg={6}>
                  <div className="extra-row__location">
                    <span>Trade status</span>
                    <p className="green-status">{formatCapitals(record.status)}</p>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="extra-row__currency">
                    <span>Date</span>
                    <p>{formatDate(record.createdAt, 'lol')}</p>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="extra-row__currency">
                    <span>Trade limits</span>
                    <p>{record.tradeLimit}</p>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="extra-row__currency">
                    <span>Price/BTC</span>
                    <p>{`${formatMoney(record.btcPrice)} ${record.currency}`}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="extra-row__currency">
                    <span>Payment method</span>
                    <p>{record.payment}</p>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="extra-row__currency">
                    <span>Location</span>
                    <p>{record.location}</p>
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
    <Column key="key" title="ID" dataIndex="order" />
    
    <Column
      key="tradePartner"
      title="Trade partner"
      render={(text, record) => {
        let user;
        if (record.direction === 'Outgoing') user = record.adOwner;
        if (record.direction === 'Incoming') user = record.tradePartner;
        return <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>;
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
    />
    <Column
      key="tradeAmount"
      title="Trade amount"
      render={(text, record) => `${record.amount} BTC`}
      sorter={(a, b) => a.amount - b.amount}
    />
    <Column
      align="right"
      key="fiat"
      title="Fiat"
      render={(text, record) => `${formatMoney(record.fiat)} ${record.currency}`}
      sorter={(a, b) => a.fiat - b.fiat}
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
  onCancel: PropTypes.func,
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
      terms: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

TradesDashboardTableDisplay.defaultProps = {};

export default TradesDashboardTableDisplay;
