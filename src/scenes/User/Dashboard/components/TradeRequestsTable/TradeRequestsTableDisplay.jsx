/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Spinner } from '@components/Spinner';
import { NoData } from '@scenes/_components/AdsTable/_components/NoData';
import { formatDate, formatMoney, sortStrings } from '@utils';
import { ROUTES } from '@config/constants';

const { Column } = Table;

const TradeRequestsTableDisplay = ({ withTerms, transactionsData, loading }) => (
  <Table
    expandRowByClick={!!window.matchMedia('(max-width: 1100px)').matches}
    dataSource={transactionsData}
    loading={{ spinning: loading, indicator: <Spinner /> }}
    locale={{ emptyText: <NoData /> }}
    expandedRowRender={
      withTerms
        ? record => (
          <div className="extra-row extra-row__left">
            <Row>
              <Col lg={6}>
                <div className="extra-row__location">
                  <span>Trade limits</span>
                  <p>{record.transactionLimit}</p>
                </div>
              </Col>

              <Col lg={6}>
                <div className="extra-row__currency">
                  <span>Payment method</span>
                  <p>{record.payment}</p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="extra-row__currency">
                  <span>Trade limits</span>
                  <p>{record.transactionLimit}</p>
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
              <Col>
                <div className="extra-row__currency">
                  <span>Terms of trade</span>
                  <p>{record.terms}</p>
                </div>
              </Col>
            </Row>
          </div>
        )
        : null
    }
  >
    <Column
      key="createdAt"
      title="Date"
      render={(text, record) => formatDate(record.createdAt)}
      sorter={(a, b) => a.createdAt - b.createdAt}
      defaultSortOrder="descend"
    />
    <Column
      key="tradePartner"
      title="Seller/Buyer"
      render={(text, record) => {
        let user;
        if (record.type === 'Buy') user = record.adOwner;
        if (record.type === 'Sell') user = record.tradePartner;
        return <Link to={`${ROUTES.USER.ROOT}/${user}`}>{user}</Link>;
      }}
      sorter={(a, b) => sortStrings(a.tradePartner, b.tradePartner)}
      width="20%"
    />

    <Column
      key="type"
      dataIndex="type"
      title="Type"
      columnWidth={80}
      render={(text, record) => record.type}
      sorter={(a, b) => sortStrings(a.type, b.type)}
    />
    <Column
      key="tradeAmount"
      title="Trade amount"
      render={(text, record) => `${record.tradeAmount} BTC`}
      sorter={(a, b) => a.tradeAmount - b.tradeAmount}
    />
    <Column
      key="fiat"
      title="Fiat"
      render={(text, record) => `${formatMoney(record.fiat)} ${record.currency}`}
      sorter={(a, b) => a.fiat - b.fiat}
    />

    <Column
      title="Action"
      render={(text, record) => <Link to={`${ROUTES.TRANSACTIONS.ROOT}/${record.key}`}>View</Link>}
    />
  </Table>
);

TradeRequestsTableDisplay.propTypes = {
  withTerms: PropTypes.bool,
  transactionsData: PropTypes.arrayOf(
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
export default TradeRequestsTableDisplay;
