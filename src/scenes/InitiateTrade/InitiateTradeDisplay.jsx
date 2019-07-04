import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import history from '@services/history';
import { Row, Col, Spin } from 'antd';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { InitiateTradeFormDisplay } from './InitiateTradeForm';
import './style.less';
import { catchFromPath } from '@utils';

const InitiateTradeDisplay = ({ getTradeByIdRequest, specificTrade, loading }) => {
  useEffect(() => {
    getTradeByIdRequest(`${catchFromPath(history.location.pathname, ['trades', 'initiate'])}`);
  }, []);

  const {
    btcPrice,
    currency,
    payment,
    location,
    terms,
    minTransactionLimit,
    maxTransactionLimit,
  } = specificTrade;
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="initiate-trade">
          <h2 className="initiate-trade__header">Buy bitcoins from user</h2>
          <span className="initiate-trade__label">How much do you want to buy?</span>
          <Row gutter={{ sm: 12, lg: 48 }}>
            <Col lg={11}>
              <InitiateTradeFormDisplay
                min={minTransactionLimit}
                max={maxTransactionLimit}
                currency={currency}
              />
            </Col>
            <Col lg={13}>
              <Spin spinning={loading}>
                <Row gutter={{ sm: 12, lg: 48 }}>
                  <Col xs={12}>
                    <span style={{ fontWeight: 500 }}>Price / BTC</span>
                    <p>
                      {btcPrice} {currency}
                    </p>
                  </Col>
                  <Col xs={12}>
                    <span style={{ fontWeight: 500 }}>Payment method</span>
                    <p>{payment}</p>
                  </Col>
                </Row>
                <Row gutter={{ sm: 12, lg: 48 }}>
                  <Col xs={12}>
                    <span style={{ fontWeight: 500 }}>Seller</span>
                    <p>
                      <a>alchemist</a>
                    </p>
                  </Col>
                  <Col xs={12}>
                    <span style={{ fontWeight: 500 }}>Trade limits</span>
                    <p>{`${minTransactionLimit} - ${maxTransactionLimit} ${currency}`}</p>
                  </Col>
                </Row>
                <Row gutter={48}>
                  <Col>
                    <span style={{ fontWeight: 500 }}>Location</span>
                    <p>{location}</p>
                  </Col>
                </Row>
                <Row gutter={48}>
                  <Col>
                    <span style={{ fontWeight: 500 }}>Terms of trade</span>
                    <p>{terms}</p>
                  </Col>
                </Row>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

InitiateTradeDisplay.propTypes = {
  getTradeByIdRequest: PropTypes.func,
  specificTrade: PropTypes.object,
  loading: PropTypes.bool,
};
InitiateTradeDisplay.defaultProps = {
  loading: false,
};

export default InitiateTradeDisplay;
