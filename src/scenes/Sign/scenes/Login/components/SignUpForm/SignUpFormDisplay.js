/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import * as validations from 'validation-rules';
import './style.less';

class SignUpFormDisplay extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // console.log({ ...values, repeatPassword: values.password });
        this.props.signupRequest({ ...values, repeatPassword: values.password });
        message.success('This is a message of success');
      }
    });
  };

  render() {
    const { loading, errors } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        {errors && errors.DuplicateEmail && (
          <Alert message={errors.DuplicateEmail} type="error" showIcon />
        )}
        {errors && errors.DuplicateUserName && (
          <Alert message={errors.DuplicateUserName} type="error" showIcon />
        )}

        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('userName', {
            rules: validations.username,
          })(<Input placeholder="Username" />)}
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
            className="signup__button"
            loading={loading}
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SignUpFormDisplay);
