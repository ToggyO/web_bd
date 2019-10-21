/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

import { ExclamationMessage } from '@components/ExclamationMessage';
import { Spinner } from '@components/Spinner';
import { ROUTES } from '@config/constants';
import * as validations from '@services/validations';
import history from '@services/history';
import superaxios from '@services/superaxios';

const InitiateTradeFormDisplay = props => {
  const {
    submitting,
    user: { id },
    form,
    adId,
    min,
    max,
    currency,
    loading,
    initiateTradeRequest,
    message,
    adOwnerID,
    cachedUserID,
    btcPrice,
  } = props;

  const [escrowFee, setEscrowFee] = useState(0);
  const isAuthorized = !!id;

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (min) {
        fetchEscrowFee();
        form.setFieldsValue({ fiat: min, amount: min / btcPrice });
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [btcPrice]);

  const fetchEscrowFee = async () => {
    const escrowFeeResponse = await superaxios.get('/escrow');
    setEscrowFee(() => escrowFeeResponse.data.data[0].fee);
  };

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
      amount: e.target.value / btcPrice || '',
    });
  };

  const handleTradeAmountChange = e => {
    form.setFieldsValue({
      fiat: e.target.value * btcPrice || '',
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

    callback('Min. trade limit should not exceed Max. trade limit');
  };

  const { fiat, amount } = form.getFieldsValue(['fiat', 'amount']);

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={12}>
        <Col xs={24} md={12}>
          <Form.Item>
            {form.getFieldDecorator('fiat', {
              initialValue: 0,
              rules: [{ validator: checkFiatValue }],
              normalize: (value, prevValue) => {
                if (value.length > 10) return '';
                // eslint-disable-next-line no-restricted-globals
                if (isNaN(value)) return '';
                if (value < 0) return prevValue;
                return Math.trunc(value);
              },
            })(
              <Input
                addonAfter={currency}
                onChange={handleFiatChange}
                disabled={adOwnerID === cachedUserID}
              />
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item>
            {form.getFieldDecorator('amount', {
              initialValue: 0,
              normalize: (value, prevValue, allValues) => {
                if (allValues.fiat === '') return 0;
                if (value === '') return 0;
                if (value < 0) return Math.ceil(prevValue * 100000000) / 100000000;
                return Math.ceil(value * 100000000) / 100000000;
              },
            })(
              <Input
                type="number"
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
          Please note that the Escrow fee and blockchain fee are charged to the buyer. The current Escrow fee
          is {escrowFee}% of the amount of bitcoin being traded. The current blockchain fee is 0.00033239 BTC.
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
          <p className="initiate-trade__confirm-text">You can't request a trade for your own ads.</p>
        ) : (
          <>
            {isAuthorized ? (
              <p className="initiate-trade__confirm-text">
                Enter receiving Bitcoin wallet public address and confirm you are willing to trade.
              </p>
            ) : (
              <p className="initiate-trade__confirm-text">Please sign in to complete the trade.</p>
            )}

            <Row gutter={12}>
              {isAuthorized ? (
                <>
                  <Col lg={17}>
                    <Form.Item>
                      {form.getFieldDecorator('walletAddress', {
                        rules: validations.btcWallet,
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
                </>
              ) : (
                <Col lg={7}>
                  <Button
                    type="primary"
                    style={{ marginBottom: 34 }}
                    htmlType="button"
                    block={!!window.matchMedia('(max-width: 992px)').matches}
                    onClick={() => history.push(`${ROUTES.LOGIN}?from=${history.location.pathname}`)}
                  >
                    Sign In
                  </Button>
                </Col>
              )}
            </Row>
          </>
        )}
      </Spinner>
    </Form>
  );
};

export default Form.create()(InitiateTradeFormDisplay);
