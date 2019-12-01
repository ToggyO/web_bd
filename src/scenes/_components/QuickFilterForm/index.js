import React from 'react';
import { Form, InputNumber, Button, Select, Row, Col } from 'antd';

import { currencies, locations, payments } from '@config/constants';

import * as validations from '@services/validations';

const { Option } = Select;

export const QuickFilterForm = Form.create()(props => {
  const { form, defaultCurrency, defaultLocation, onSearch, backpack } = props;
  const { getFieldDecorator } = form;

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row type="flex" gutter={5}>
        <Col xs={24} md={12} lg={5} xl={5}>
          <Form.Item>
            {getFieldDecorator('amount', {
              rules: validations.amount,
              initialValue: backpack && backpack.amount,
            })(
              <InputNumber
                placeholder="Amount"
                min={0}
                step={10}
                parser={string => (parseInt(string, 10) ? string : '')}
              />,
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={5} xl={6}>
          <Form.Item>
            {getFieldDecorator('payment', {
              rules: [{ required: false, message: 'Please select payment method!' }],
              initialValue: backpack && backpack.payment,
            })(
              <Select placeholder="All payment methods" allowClear>
                {payments.map(payment_ => (
                  <Option key={payment_.name} value={payment_.value}>
                    {payment_.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={5} xl={6}>
          <Form.Item>
            {getFieldDecorator('location', {
              rules: [{ required: false, message: 'Please select country!' }],
              initialValue: backpack ? backpack.location : defaultLocation,
            })(
              <Select placeholder="All countries" allowClear>
                {locations.map(location_ => (
                  <Option key={location_.name} value={location_.value}>
                    {location_.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={5} xl={5}>
          <Form.Item>
            {getFieldDecorator('currency', {
              rules: [{ required: false, message: 'Please select currency!' }],
              initialValue: backpack ? backpack.currency : defaultCurrency,
            })(
              <Select placeholder="All currencies" allowClear>
                {currencies.map(currency_ => (
                  <Option key={currency_.name} value={currency_.value}>
                    {currency_.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={4} xl={2}>
          <Form.Item>
            <Button
              type="primary"
              style={{ width: '100%', padding: '0 10px' }}
              htmlType="submit"
              className="primary-btn"
            >
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});
