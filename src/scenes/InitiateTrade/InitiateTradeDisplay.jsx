import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import './style.less';
import { InitiateTradeFormDisplay } from './InitiateTradeForm';

const InitiateTradeDisplay = () => {
  const [formAmount, setFormAmount] = useState({ currencyAmount: '', btcAmount: '' });
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="initiate-trade">
          <h2 className="initiate-trade__header">Buy bitcoins from user</h2>
          <span className="initiate-trade__label">How much do you want to buy?</span>
          <Row gutter={{ sm: 12, lg: 48 }}>
            <Col lg={11}>
              <InitiateTradeFormDisplay />
            </Col>
            <Col lg={13}>
              <Row gutter={{ sm: 12, lg: 48 }}>
                <Col xs={12}>
                  <span style={{ fontWeight: 500 }}>Price / BTC</span>
                  <p>8,262.32 USD</p>
                </Col>
                <Col xs={12}>
                  <span style={{ fontWeight: 500 }}>Payment method</span>
                  <p>PayPal</p>
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
                  <p>2,000 - 11,761 USD</p>
                </Col>
              </Row>
              <Row gutter={48}>
                <Col>
                  <span style={{ fontWeight: 500 }}>Location</span>
                  <p>USA</p>
                </Col>
              </Row>
              <Row gutter={48}>
                <Col>
                  <span style={{ fontWeight: 500 }}>Terms of trade</span>
                  <p>
                    Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris interesset. Eum
                    te odio zril facilisi, quo singulis torquatos in, sea in duis bonorum adipisci.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

export default InitiateTradeDisplay;
