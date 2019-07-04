/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Form, Icon, Row, Col, Input, Button } from 'antd';

const InitiateTradeFormDisplay = props => {
  const { form, min, max, currency } = props;
  useEffect(() => {
    form.setFieldsValue({ fiat: '', tradeAmount: '' });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  const handleFiatChange = e => {
    form.setFieldsValue({
      tradeAmount: e.target.value / 10000 || '',
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

  const { fiat, tradeAmount } = form.getFieldsValue(['fiat', 'tradeAmount']);

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={12}>
        <Col xs={12}>
          <Form.Item>
            {form.getFieldDecorator('fiat', {
              initialValue: null,
              rules: [{ validator: checkFiatValue }],
            })(<Input addonAfter={currency} onChange={handleFiatChange} />)}
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item>
            {form.getFieldDecorator('tradeAmount', {
              initialValue: null,
            })(<Input addonAfter="BTC" onChange={handleTradeAmountChange} />)}
          </Form.Item>
        </Col>
      </Row>

      <div className="initiate-trade__note">
        <Icon type="exclamation-circle" theme="filled" className="initiate-trade__icon" />
        <p className="initiate-trade__text">
          Note that Escrow fee and blockchain transaction fee are charged from a buyer. Current Escrow fee is
          0,75% from the trade amount. Current blockchain transaction fee is approximately 0.00033239 BTC.
        </p>
      </div>
      <div className="initiate-trade__message">
        <span className="initiate-trade__label">Contact message</span>
        <div className="initiate-trade__fake-message">{`Hi, I'd like to buy your ${tradeAmount} BTC for my ${fiat} ${currency}`}</div>
      </div>
      <p className="initiate-trade__confirm-text">Please confirm you are willing to trade.</p>
      <Button htmlType="submit" type="primary">
        Request trade
      </Button>
    </Form>
  );
};

export default Form.create()(InitiateTradeFormDisplay);
