/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { ROUTES } from '@config/constants';
import { formatMoney, formatCapitals } from '@utils';

export const TradeDetails = ({ specificTrade }) => (
  <>
    <Row>
      <Col xs={12}>
        <span className="span-head">Trade amount</span>
        <p>{specificTrade.amount} BTC</p>
      </Col>
      <Col xs={12}>
        <span className="span-head">Fiat</span>
        <p>
          {formatMoney(specificTrade.fiat)} {specificTrade.currency}
        </p>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <span className="span-head">Trade status</span>
        <p className="green-status">{formatCapitals(specificTrade.status)}</p>
      </Col>
      <Col xs={12}>
        <span className="span-head">Ad owner</span>
        <p>
          <Link to={`${ROUTES.USER.ROOT}/${specificTrade.adOwner}`}>{specificTrade.adOwner}</Link>
        </p>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <span className="span-head">Price/BTC</span>
        <p>
          {formatMoney(specificTrade.btcPrice)} {specificTrade.currency}
        </p>
      </Col>
      <Col xs={12}>
        <span className="span-head">Payment method</span>
        <p>{specificTrade.payment}</p>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <span className="span-head">Trade limits</span>
        <p>
          {`${formatMoney(specificTrade.minTradeLimit)} - ${formatMoney(specificTrade.maxTradeLimit)} `}{' '}
          {specificTrade.currency}
        </p>
      </Col>
      <Col xs={12}>
        <span className="span-head">Location</span>
        <p>{specificTrade.location}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <span className="span-head">Terms of trade</span>
        <p>{specificTrade.terms}</p>
      </Col>
    </Row>
  </>
);
