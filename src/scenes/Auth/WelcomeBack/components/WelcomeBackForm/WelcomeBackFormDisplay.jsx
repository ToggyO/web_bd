/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Statistic } from 'antd';

import * as validations from '@services/validations';

import { notUndefinedObjectProps } from '@utils';

const { Countdown } = Statistic;

class WelcomeBackForm extends React.Component {
  state = {
    submitDisabled: true,
    deadline: null,
    isGetCodeDisabled: false,
  };

  componentDidUpdate() {
    const { submitDisabled } = this.state;
    const { form } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }
  }

  // method for switching back <button>Get Code</button> state
  onFinish = () => {
    this.setState({ isGetCodeDisabled: false });
  };

  handleSubmit = (e, code) => {
    const {
      user: { userName },
      form,
    } = this.props;
    e.preventDefault();

    if (code) {
      const twoFactorCode = code;
      this.props.signInWithCode({ userName, twoFactorCode });
      return;
    }

    form.validateFields((err, values) => {
      if (!err) {
        this.props.signInWithCode({ userName, twoFactorCode: values.twoFactorCode });
      }
    });
  };

  handleGetCode = e => {
    const {
      user: { userName },
      phoneNumber,
    } = this.props;
    e.preventDefault();
    this.props.smsCodeRequest({ userName, phone: phoneNumber });
    this.codeInput.focus();
    // disable button for 60 seconds
    this.setState({ deadline: Date.now() + 60000, isGetCodeDisabled: true });
  };

  handleCodeChange = e => {
    if (e.target.value.length === 6) {
      this.codeInput.blur();
      this.handleSubmit(e, e.target.value);
    }
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
                pattern="\d*"
                placeholder="Verification code"
                ref={input => {
                  this.codeInput = input;
                }}
                onChange={this.handleCodeChange}
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
