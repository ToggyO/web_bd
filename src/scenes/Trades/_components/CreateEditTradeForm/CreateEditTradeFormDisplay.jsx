/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Radio, Select, Button, Input, Divider } from 'antd';
import { currencies, locations, paymentMethods } from '@config/constants';
import { getInitialValuesBasedOnNavigatorLanguage } from '@services/navigator';
import TransactionLimits from './TransactionLimits';
import './style.less';

const { Option } = Select;

class CreateEditTradeFormDisplay extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkLimits = (rule, value, callback) => {
    if (value.max > 0) {
      if (value.min > 0 && value.max > 0 && value.max > value.min) {
        callback();
        return;
      }
      callback('Please check your limits!');
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { props } = this;
    const { form } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="create-edit-form" hideRequiredMark>
        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">Trade type</h3>
          <Divider />
          <Form.Item className="create-edit-form__item">
            {getFieldDecorator('tradeType', {
              rules: [{ required: true, message: <div>Please select trade type!</div> }],
              initialValue: 'Buy',
            })(
              <Radio.Group>
                <Radio value="Buy">I want to buy bitcoins</Radio>
                <Radio value="Sell">I want to sell bitcoins</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </div>

        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">Trade information</h3>
          <Divider />
          <Row gutter={48}>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Currency">
                {getFieldDecorator('currency', {
                  rules: [{ required: true, message: <div>Please select currency!</div> }],
                  initialValue: getInitialValuesBasedOnNavigatorLanguage().currency,
                })(
                  <Select
                    showSearch
                    placeholder="Select currency"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {currencies.map(currency => (
                      <Option key={currency.name} value={currency.value}>
                        {currency.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Location">
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: <div>Please select location!</div> }],
                  initialValue: getInitialValuesBasedOnNavigatorLanguage().location,
                })(
                  <Select
                    showSearch
                    placeholder="Select country"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {locations.map(location => (
                      <Option key={location.name} value={location.value}>
                        {location.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={48}>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Payment method">
                {getFieldDecorator('paymentMethod', {
                  rules: [{ required: true, message: <div>Please select payment method!</div> }],
                })(
                  <Select
                    showSearch
                    placeholder="Select payment method"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {paymentMethods.map(paymentMethod => (
                      <Option key={paymentMethod.name} value={paymentMethod.value}>
                        {paymentMethod.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">Price</h3>
          <Divider />
          <Row gutter={48}>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Margin">
                {getFieldDecorator('margin', {
                  rules: [{ required: true, message: <div>Please input margin!</div> }],
                })(<Input placeholder="Margin" addonAfter="%" />)}
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="BTC trade price">
                {getFieldDecorator('btcPrice', {
                  rules: [{ required: true, message: <div>Please input BTC price!</div> }],
                })(<Input placeholder="Margin" addonAfter={`${form.getFieldsValue(['currency']).currency}/BTC`} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={48}>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Transaction limits">
                {getFieldDecorator('transactionLimits', {
                  initialValue: { min: 0, max: 0 },
                  rules: [{ required: true }, { validator: this.checkLimits }],
                })(<TransactionLimits {...props} />)}
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">Bank information</h3>
          <Divider />
          <Row gutter={48}>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Bank name">
                {getFieldDecorator('bankName', {
                  rules: [{ required: true, message: <div>Please input bank name!</div> }],
                })(<Input placeholder="Sberbank" />)}
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Branch name">
                {getFieldDecorator('branchName', {
                  rules: [{ required: true, message: <div>Please input branch name!</div> }],
                })(<Input placeholder="FGRWJHWDDS" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={48}>
            <Col lg={12}>
              <Form.Item className="create-edit-form__item" label="Bank SWIFT">
                {getFieldDecorator('bankSwift', {
                  rules: [{ required: true, message: <div>Please input bank SWIFT!</div> }],
                })(<Input placeholder="FWHJ22GU22S22" />)}
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="create-edit-form__block">
          <h3 className="create-edit-form__header">More information</h3>
          <Divider />
          <Row gutter={48}>
            <Col>
              <Form.Item className="create-edit-form__item" label="Terms of trade">
                {getFieldDecorator('terms', {
                  rules: [{ required: true, message: <div>Please input some terms!</div> }],
                })(<Input.TextArea className=" create-edit-form__textarea" placeholder="Terms of trade..." rows={5} />)}
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create a trade
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CreateEditTradeFormDisplay);
