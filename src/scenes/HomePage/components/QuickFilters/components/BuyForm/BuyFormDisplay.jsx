/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import * as validations from 'src/services/validations';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class BuyFormDisplay extends React.Component {
  componentDidMount() {
    const { form } = this.props;
    // To disabled submit button at the beginning.
    form.validateFields();
  }

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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const amountError = isFieldTouched('amount') && getFieldError('amount');
    const paymentMethodError = isFieldTouched('paymentMethod') && getFieldError('paymentMethod');
    const countryError = isFieldTouched('country') && getFieldError('country');
    const currencyError = isFieldTouched('country') && getFieldError('country');

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={amountError ? 'error' : ''} help={amountError || ''}>
          {getFieldDecorator('amount', {
            rules: validations.amount,
          })(<Input placeholder="Amount" style={{ width: 220 }} />)}
        </Form.Item>

        <Form.Item
          validateStatus={paymentMethodError ? 'error' : ''}
          help={paymentMethodError || ''}
        >
          {getFieldDecorator('paymentMethod', {
            rules: [{ required: true, message: 'Please select payment method!' }],
          })(
            <Select placeholder="All payment methods" style={{ width: 220 }}>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="paypal">PayPal</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item validateStatus={countryError ? 'error' : ''} help={countryError || ''}>
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Please select country!' }],
          })(
            <Select placeholder="All countries" style={{ width: 220 }}>
              <Select.Option value="usa">USA</Select.Option>
              <Select.Option value="russia">Russia</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item validateStatus={currencyError ? 'error' : ''} help={currencyError || ''}>
          {getFieldDecorator('currency', {
            rules: [{ required: true, message: 'Please select currency!' }],
          })(
            <Select placeholder="All currencies" style={{ width: 220 }}>
              <Select.Option value="usd">USD</Select.Option>
              <Select.Option value="rub">RUB</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="primary-btn"
            disabled={hasErrors(getFieldsError())}
          >
            Search
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(BuyFormDisplay);
