/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';
import * as validations from 'validation-rules';
import './style.less';

class SignUpForm extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('username', {
            rules: validations.username,
          })(<Input placeholder="Username" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: validations.password,
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('realname', {
            rules: validations.realname,
          })(<Input placeholder="Real Name" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('email', {
            rules: validations.email,
          })(<Input type="email" placeholder="Email" />)}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="signup__button">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SignUpForm);
