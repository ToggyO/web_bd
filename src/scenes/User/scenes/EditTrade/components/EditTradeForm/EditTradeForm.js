/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Radio, Select, Button, Input } from 'antd';
import './style.less';

const RadioGroup = Radio.Group;
const { Option } = Select;
const countries = ['USA', 'Russia', 'Canada', 'Hong Kong'];
const currencies = ['USD', 'RUB', 'CAD', 'HKD'];
const paymentMethods = ['Cash deposite', 'BTC'];

// Mini-component for transaction limits
class TransactionLimits extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      min: value.min || 0,
      max: value.max || 0,
    };
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (!('value' in this.props)) {
      this.setState({ [e.target.name]: number });
    }
    this.triggerChange({ [e.target.name]: number });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    return (
      <Input.Group compact>
        <Input
          style={{ width: 169, textAlign: 'center' }}
          placeholder="Minimum"
          value={this.state.min}
          onChange={this.handleNumberChange}
          name="min"
          type="number"
        />
        <Input
          style={{
            width: 30,
            borderLeft: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
          }}
          placeholder="~"
          disabled
        />
        <Input
          style={{ width: 169, textAlign: 'center', borderLeft: 0 }}
          placeholder="Maximum"
          value={this.state.max}
          onChange={this.handleNumberChange}
          name="max"
          type="number"
        />
      </Input.Group>
    );
  }
}

// Main component

class EditTradeForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkLimits = (rule, value, callback) => {
    console.log(value);

    if (value.min > 0 && value.max > 0 && value.max > value.min) {
      callback();
      return;
    }
    callback('Please check your limits!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3 className="edit-form__header">Trade type</h3>
        <Form.Item className="edit-form__item">
          {getFieldDecorator('tradeType', {
            rules: [{ required: true, message: <div>Please select trade type!</div> }],
          })(
            <RadioGroup>
              <Radio value="buy">I want to buy bitcoins</Radio>
              <Radio value="sell">I want to sell bitcoins</Radio>
            </RadioGroup>,
          )}
        </Form.Item>
        <h3 className="edit-form__header">Trade information</h3>
        <Row>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Location">
              {getFieldDecorator('location', {
                rules: [{ required: true, message: <div>Please select location!</div> }],
              })(
                <Select
                  showSearch
                  style={{ width: 368 }}
                  placeholder="Select country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countries.map(country => (
                    <Option key={country} value={country.toLowerCase()}>
                      {country}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Currency">
              {getFieldDecorator('currency', {
                rules: [{ required: true, message: <div>Please select currency!</div> }],
              })(
                <Select
                  showSearch
                  style={{ width: 368 }}
                  placeholder="Select currency"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {currencies.map(currency => (
                    <Option key={currency} value={currency.toLowerCase()}>
                      {currency}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Payment method">
              {getFieldDecorator('paymentMethod', {
                rules: [
                  { required: true, message: <div>Please select payment method!</div> },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 368 }}
                  placeholder="Select payment method"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {paymentMethods.map(paymentMethod => (
                    <Option key={paymentMethod} value={paymentMethod.toLowerCase()}>
                      {paymentMethod}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>

        <h3 className="edit-form__header">Bank information</h3>
        <Row>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Bank name">
              {getFieldDecorator('bankName', {
                rules: [{ required: true, message: <div>Please input bank name!</div> }],
              })(<Input className="edit-form__input" placeholder="Sberbank" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Branch name">
              {getFieldDecorator('branchName', {
                rules: [
                  { required: true, message: <div>Please input branch name!</div> },
                ],
              })(<Input className="edit-form__input" placeholder="FGRWJHWDDS" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Bank SWIFT">
              {getFieldDecorator('bankSwift', {
                rules: [{ required: true, message: <div>Please input bank SWIFT!</div> }],
              })(<Input className="edit-form__input" placeholder="FWHJ22GU22S22" />)}
            </Form.Item>
          </Col>
        </Row>

        <h3 className="edit-form__header">More information</h3>
        <Row>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Terms of trade">
              {getFieldDecorator('terms', {
                rules: [{ required: true, message: <div>Please input some terms!</div> }],
              })(
                <Input.TextArea
                  className="edit-form__input edit-form__textarea"
                  placeholder="Terms of trade..."
                  rows={6}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item className="edit-form__item" label="Transaction limits">
              {getFieldDecorator('transactionLimits', {
                initialValue: { min: 0, max: 0 },
                rules: [{ required: true }, { validator: this.checkLimits }],
              })(<TransactionLimits />)}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 24 }}>
            Update information
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditTradeForm);
