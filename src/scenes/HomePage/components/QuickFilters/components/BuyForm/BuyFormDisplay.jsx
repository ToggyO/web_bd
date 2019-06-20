/* eslint-disable react/prop-types */
import React from 'react';
import { Form, InputNumber, Button, Select, Row, Col } from 'antd';
import { currencies, locations, paymentMethods } from '@config/constants';
import * as validations from '@services/validations';

const { Option } = Select;

class BuyFormDisplay extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={6}>
          <Col lg={5}>
            <Form.Item>
              {getFieldDecorator('amount', {
                rules: validations.amount,
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
              {getFieldDecorator('paymentMethod', {
                rules: [{ required: true, message: 'Please select payment method!' }],
                initialValue: paymentMethods[0].value,
              })(
                <Select placeholder="All payment methods">
                  {paymentMethods.map(paymentMethod => (
                    <Option key={paymentMethod.name} value={paymentMethod.value}>
                      {paymentMethod.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item>
              {getFieldDecorator('country', {
                rules: [{ required: true, message: 'Please select country!' }],
                initialValue: locations[0].value,
              })(
                <Select placeholder="All countries">
                  {locations.map(location => (
                    <Option key={location.name} value={location.value}>
                      {location.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={5}>
            <Form.Item>
              {getFieldDecorator('currency', {
                rules: [{ required: true, message: 'Please select currency!' }],
                initialValue: currencies[0].value,
              })(
                <Select placeholder="All currencies">
                  {currencies.map(currency => (
                    <Option key={currency.name} value={currency.value}>
                      {currency.name}
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
  }
}

export default Form.create()(BuyFormDisplay);
