/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Statistic, message } from 'antd';

import * as validations from '@services/validations';

import { notUndefinedObjectProps } from '@utils';

const { Countdown } = Statistic;

class EditEmailFormDisplay extends React.Component {
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
      if (errors.DuplicateEmail) message.error(errors.DuplicateEmail, 8);
      if (Array.isArray(errors)) message.error('Verification code is not valid', 8);
    }
  }

  // method for switching back <button>Get Code</button> state
  onFinish = () => {
    this.setState({ isGetCodeDisabled: false });
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const code = values.smscode;
        const { email } = values;
        this.props.editEmailRequest({ code, email });
      }
    });
  };

  handleGetCode = e => {
    e.preventDefault();
    this.props.getSmsCodeRequest();
    this.codeInput.focus();
    // disable button for 60 seconds
    this.setState({ deadline: Date.now() + 60000, isGetCodeDisabled: true });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { deadline, isGetCodeDisabled } = this.state;
    const { loading } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="edit-form" hideRequiredMark>
        <Form.Item label="Enter verification code" style={{ maxWidth: 368, marginBottom: 20 }}>
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

        <Form.Item label="Enter new email address" style={{ maxWidth: 368, marginBottom: 38 }}>
          {getFieldDecorator('email', {
            rules: validations.email,
          })(<Input type="email" placeholder="Email" />)}
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="primary-btn"
            disabled={this.state.submitDisabled}
          >
            Change email
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditEmailFormDisplay);
