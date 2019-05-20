// prop-types disabled for ant forms
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Select, Statistic } from 'antd';
import * as validations from 'validation-rules';
import './style.less';

const { Option } = Select;
const { Countdown } = Statistic;

class NormalLoginForm extends React.Component {
  state = {
    deadline: null,
    isGetCodeDisabled: false,
  };

  // method for switching back <button>Get Code</button> state
  onFinish = () => {
    this.setState({ isGetCodeDisabled: false });
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const phoneAndCode = {
          phone: values.prefix + values.phone,
          twoFactorCode: values.smscode,
        };
        this.props.twoFactorAuthRequest(phoneAndCode);
      }
    });
  };

  handleGetCode = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(['prefix', 'phone'], (err, values) => {
      if (!err) {
        const phone = values.prefix + values.phone;
        this.props.smsCodeRequest(phone);

        // disable button for 60 seconds
        this.setState({ deadline: Date.now() + 60000, isGetCodeDisabled: true });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading } = this.props;
    const { deadline, isGetCodeDisabled } = this.state;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '7',
    })(
      <Select style={{ width: 86 }} className="prefix-select">
        <Option value="7">7</Option>
        <Option value="0753">0753</Option>
      </Select>,
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: validations.phone,
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              placeholder="Phone number"
              disabled={isGetCodeDisabled}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <div className="verification-code">
            {getFieldDecorator('smscode', {
              rules: validations.smscode,
            })(<Input placeholder="Verification code" />)}

            <Button onClick={this.handleGetCode} disabled={isGetCodeDisabled}>
              {isGetCodeDisabled ? (
                <Countdown
                  value={deadline}
                  suffix="s"
                  format="ss"
                  onFinish={this.onFinish}
                />
              ) : (
                'Get code'
              )}
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="signup__button"
            loading={isLoading}
          >
            Get 2 Factor Authentification
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);