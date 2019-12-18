/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';

import * as validations from '@services/validations';

import { notUndefinedObjectProps } from '@utils';
import './style.less';

class SignUpFormDisplay extends React.Component {
  state = {
    submitDisabled: true,
  };

  componentDidUpdate() {
    const { submitDisabled } = this.state;
    const { form } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }
  }

  handleSubmit = e => {
    const { signupRequest, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        signupRequest({ ...values, repeatPassword: values.password });
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('userName', {
            rules: validations.username,
          })(<Input placeholder="Username" autoFocus />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: validations.password,
          })(<Input.Password type="password" placeholder="Password" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('fullName', {
            rules: validations.realname,
          })(<Input placeholder="Real Name" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('email', {
            rules: validations.email,
          })(<Input type="email" placeholder="Email" />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="signup__button primary-btn"
            loading={loading}
            disabled={this.state.submitDisabled}
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SignUpFormDisplay);
