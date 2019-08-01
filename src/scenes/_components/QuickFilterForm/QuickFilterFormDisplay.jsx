import React from 'react';
import { Form, InputNumber, Button, Select, Row, Col } from 'antd';
import { ROUTES, currencies, locations, payments } from '@config/constants';
import history from '@services/history';
import * as validations from '@services/validations';

import { purifyObject, makeQueryStringFromObject } from '@utils';

const { Option } = Select;

const QuickFilterFormDisplay = Form.create()(props => {
  const { form, type, filterDataSubmit, amount, payment, location, currency } = props;
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        filterDataSubmit(values);

        const queryString = makeQueryStringFromObject(purifyObject(values));

        if (type.toLowerCase() === 'buy') {
          history.push({
            pathname: ROUTES.ADS.SELL,
            search: queryString,
          });
        }
        if (type.toLowerCase() === 'sell') {
          history.push({
            pathname: ROUTES.ADS.BUY,
            search: queryString,
          });
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={6}>
        <Col lg={5}>
          <Form.Item>
            {getFieldDecorator('amount', {
              rules: validations.amount,
              initialValue: amount,
            })(
              <InputNumber
                placeholder="Amount"
                min={0}
                step={10}
                parser={string => (parseInt(string, 10) ? string : '')}
              />
            )}
          </Form.Item>
        </Col>
        <Col lg={6}>
          <Form.Item>
            {getFieldDecorator('payment', {
              rules: [{ required: false, message: 'Please select payment method!' }],
              initialValue: payment,
            })(
              <Select placeholder="All payment methods" allowClear>
                {payments.map(payment_ => (
                  <Option key={payment_.name} value={payment_.value}>
                    {payment_.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col lg={6}>
          <Form.Item>
            {getFieldDecorator('location', {
              rules: [{ required: false, message: 'Please select country!' }],
              initialValue: location,
            })(
              <Select placeholder="All countries" allowClear>
                {locations.map(location_ => (
                  <Option key={location_.name} value={location_.value}>
                    {location_.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col lg={5}>
          <Form.Item>
            {getFieldDecorator('currency', {
              rules: [{ required: false, message: 'Please select currency!' }],
              initialValue: currency,
            })(
              <Select placeholder="All currencies" allowClear>
                {currencies.map(currency_ => (
                  <Option key={currency_.name} value={currency_.value}>
                    {currency_.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col lg={2}>
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

// QuickFilterFormDisplay.defaultProps = {
//   amount: null,
//   payment: initialProps.payment,
//   location: initialProps.location,
//   currency: initialProps.currency,
// };

export default QuickFilterFormDisplay;
