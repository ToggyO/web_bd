/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Form, Row, Col, Input, InputNumber, Button } from 'antd';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { Spinner } from '@components/Spinner';

const InitiateTradeFormDisplay = props => {
  const {
    form,
    adId,
    min,
    max,
    currency,
    loading,
    initiateTradeRequest,
    submitting,
    message,
    adOwnerID,
    cachedUserID,
  } = props;
  useEffect(() => {
    form.setFieldsValue({ fiat: '', amount: '' });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        initiateTradeRequest({ ...values, fiat: parseInt(values.fiat, 10), adId });
      }
    });
  };

  const handleFiatChange = e => {
    form.setFieldsValue({
      amount: e.target.value / 10000 || '',
    });
  };

  const handleTradeAmountChange = e => {
    form.setFieldsValue({
      fiat: e.target.value * 10000 || '',
    });
  };

  const checkFiatValue = (rule, value, callback) => {
    if (value <= max && value >= min) {
      callback();
      return;
    }
    if (!value) {
      callback('Please input trade amount');
      return;
    }
    callback(`Trade amount for this ad should be between ${min} - ${max} ${currency}`);
  };

  const { fiat, amount } = form.getFieldsValue(['fiat', 'amount']);

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={12}>
        <Col xs={12}>
          <Form.Item>
            {form.getFieldDecorator('fiat', {
              initialValue: 0,
              rules: [{ validator: checkFiatValue }],
            })(
              <Input
                addonAfter={currency}
                onChange={handleFiatChange}
                disabled={adOwnerID === cachedUserID}
              />
            )}
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item>
            {form.getFieldDecorator('amount', {
              initialValue: 0,
            })(
              <Input
                // type="number"
                addonAfter="BTC"
                onChange={handleTradeAmountChange}
                disabled={adOwnerID === cachedUserID}
              />
            )}
          </Form.Item>
        </Col>
      </Row>

      <div className="initiate-trade__note">
        <ExclamationMessage>
          Note that Escrow fee and blockchain transaction fee are charged from a buyer. Current Escrow fee is
          0.75% from the trade amount. Current blockchain transaction fee is approximately 0.00033239 BTC.
        </ExclamationMessage>
      </div>
      <div className="initiate-trade__message">
        <span className="initiate-trade__label">Contact message</span>
        <div className="initiate-trade__fake-message">{`${message[0]} ${amount} BTC ${
          message[1]
        } ${fiat} ${currency}`}</div>
      </div>
      <Spinner spinning={loading}>
        {adOwnerID === cachedUserID ? (
          <div className="hidden">
            <p className="initiate-trade__confirm-text">You cannot trade with yourself.</p>
            <Button htmlType="button" type="primary" className="primary-btn" disabled>
              Sorry, bro
            </Button>
          </div>
        ) : (
          <div className="hidden">
            <p className="initiate-trade__confirm-text">
              Enter receiving Bitcoin wallet public address and confirm you are willing to trade.
            </p>
            <Row gutter={12}>
              <Col lg={17}>
                <Form.Item>
                  {form.getFieldDecorator('walletAddress', {
                    rules: [{ required: true, message: 'Please input your bitcoin wallet public address' }],
                  })(<Input placeholder="Enter wallet address" />)}
                </Form.Item>
              </Col>
              <Col lg={7}>
                <Button
                  type="primary"
                  style={{ marginBottom: 34 }}
                  htmlType="submit"
                  loading={submitting}
                  block={!!window.matchMedia('(max-width: 992px)').matches}
                >
                  Request trade
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Spinner>
    </Form>
  );
};

export default Form.create()(InitiateTradeFormDisplay);
