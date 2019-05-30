/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import * as validations from 'src/services/validations';
import { notUndefinedObjectProps } from 'src/utils';
import './style.less';

class SignUpFormDisplay extends React.Component {
  state = {
    submitDisabled: true,
  };

  componentDidUpdate(prevProps) {
    const { submitDisabled } = this.state;
    const { errors, form } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }

    if (errors !== prevProps.errors) {
      if (errors.DuplicateEmail) message.error(errors.DuplicateEmail, 8);
      if (errors.DuplicateUserName) message.error(errors.DuplicateUserName, 8);
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
