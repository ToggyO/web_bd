/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { ExclamationMessage } from '@components/ExclamationMessage';
import { Spinner } from '@components/Spinner';
import { ROUTES } from '@config/constants';
import * as validations from '@services/validations';
import history from '@services/history';

const InitiateTradeFormDisplay = props => {
  const {
    submitting,
    isAuthorized,
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
  } = props;

  const [btcPrice, setBtcPrice] = useState(1);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (min) {
        fetchBTCPrice(currency);
        form.setFieldsValue({ fiat: min, amount: min / btcPrice });
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [btcPrice]);

  const fetchBTCPrice = async value => {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.coindesk.com/v1/bpi/currentprice/${value}.json`
    );
    const data = await response.json();
    setBtcPrice(() => +data.bpi[currency].rate_float.toFixed(2));
    // this.setState({ btcPrice: +data.bpi[value].rate_float.toFixed(2), loading: false });
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
        <Col xs={12}>
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
        <Col xs={12}>
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
