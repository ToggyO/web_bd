/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Spinner } from '@components/Spinner';
import { NoData } from '@scenes/_components/AdsTable/_components/NoData';
import { formatDate, formatMoney, sortStrings, prettifyId, formatCapitals } from '@utils';
import { ROUTES } from '@config/constants';
import { ButtonLink } from '@components/ButtonLink';
import { ShowConfirm } from '@components/ShowConfirm';

const { Column } = Table;

const TradesDashboardTableDisplay = ({ withTerms, tradesData, onDelete, loading, requests }) => (
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
              <Link className="extra-row__view" to={`/trades/${record.key}`}>
                {requests ? 'View request' : 'View trade'}
              </Link>
              {requests ? (
                <ButtonLink
                  onClick={() =>
                    ShowConfirm(
                      record.key,
                      onDelete,
                      {
                        title: 'You\'re about to delete this trade request',
                        content: 'You won\'t be able to accept it after it is deleted.',
                      },
                      {
                        okText: 'Delete',
                        cancelText: 'Keep it',
                      }
                    )
                  }
                >
                    Delete request
                </ButtonLink>
              ) : (
                <ButtonLink onClick={() => onDelete(record.key)} ><span role="img" aria-label="img">💩</span></ButtonLink>
              )}
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
                    <p>{formatDate(record.createdAt)}</p>
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
    <Column key="key" title="ID" render={(text, record) => prettifyId(record.key)} />
    {/* <Column
      key="createdAt"
      title="Date"
      render={(text, record) => formatDate(record.createdAt)}
      sorter={(a, b) => a.createdAt - b.createdAt}
      defaultSortOrder="descend"
    /> */}
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
  onDelete: PropTypes.func,
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
  requests: PropTypes.bool,
  loading: PropTypes.bool,
};

TradesDashboardTableDisplay.defaultProps = {
  requests: false,
  onDelete: () => {},
};

export default TradesDashboardTableDisplay;
