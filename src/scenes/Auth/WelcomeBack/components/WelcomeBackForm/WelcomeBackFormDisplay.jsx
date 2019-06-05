/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Statistic, message } from 'antd';
import * as validations from 'src/services/validations';
import { notUndefinedObjectProps } from 'src/utils';

const { Countdown } = Statistic;

class WelcomeBackForm extends React.Component {
  state = {
    submitDisabled: true,
    deadline: null,
    isGetCodeDisabled: false,
  };

  componentDidUpdate(prevProps) {
    const { submitDisabled } = this.state;
    const { form, errors } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }
    if (errors !== prevProps.errors) {
      if (Array.isArray(errors))
        message.error('Invalid or expired code, check your input or request a new code ', 8);
    }
  }

  // method for switching back <button>Get Code</button> state
  onFinish = () => {
    this.setState({ isGetCodeDisabled: false });
  };

  handleSubmit = e => {
    const { userName, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const twoFactorCode = values.smscode;

        this.props.signInWithCode({ userName, twoFactorCode });
      }
    });
  };

  handleGetCode = e => {
    const { userName, phoneNumber } = this.props;
    e.preventDefault();
    this.props.smsCodeRequest({ userName, phone: phoneNumber });
    this.codeInput.focus();
    // disable button for 60 seconds
    this.setState({ deadline: Date.now() + 60000, isGetCodeDisabled: true });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const { deadline, isGetCodeDisabled } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          <div className="verification-code">
            {getFieldDecorator('smscode', {
              rules: validations.smscode,
            })(
              <Input
                placeholder="Verification code"
                ref={input => {
                  this.codeInput = input;
                }}
              />
            )}

            <Button onClick={this.handleGetCode} disabled={isGetCodeDisabled} className="timer-btn">
              {isGetCodeDisabled ? (
                <Countdown value={deadline} suffix="s" format="ss" onFinish={this.onFinish} />
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
            className="primary-btn"
            loading={loading}
            disabled={this.state.submitDisabled}
          >
            Enter
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(WelcomeBackForm);
