/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import history from '@services/history';
import { catchFromPath } from '@utils';

const WalletAddressFormDisplay = ({ form, confirmTradeRequest, submitting }) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const id = catchFromPath(history.location.pathname, 'trades');
        confirmTradeRequest({ ...values, id });
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={12}>
        <Col lg={17}>
          <Form.Item>
            {form.getFieldDecorator('walletPublicAddress', {
              rules: [{ required: true, message: 'Please input your bitcoin wallet public address' }],
            })(<Input autoFocus placeholder="Enter wallet address" />)}
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
    </Form>
  );
};

export default Form.create()(WalletAddressFormDisplay);
