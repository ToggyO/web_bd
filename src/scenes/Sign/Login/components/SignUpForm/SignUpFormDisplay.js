/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import * as validations from 'validation-rules';
import './style.less';

class SignUpFormDisplay extends React.Component {
  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    if (errors !== prevProps.errors) {
      if (errors.DuplicateEmail) message.error(errors.DuplicateEmail, 8);
      if (errors.DuplicateUserName) message.error(errors.DuplicateUserName, 8);
    }
  }

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.signupRequest({ ...values, repeatPassword: values.password });
      }
    });
  };

  render() {
    const { isLoading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
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
            loading={isLoading}
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SignUpFormDisplay);
