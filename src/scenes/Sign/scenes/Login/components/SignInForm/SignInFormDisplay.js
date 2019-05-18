/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { PATH } from 'paths';
import './style.less';

class Recaptcha extends React.PureComponent {
  doCaptcha = result => {
    this.props.onChange(result);
  };

  render() {
    return (
      <ReCAPTCHA
        // set real sitekey
        sitekey="6LfFtqEUAAAAAD7I_-zjtYgRn45xiK7WpCiMI0cQ"
        onChange={this.doCaptcha}
      />
    );
  }
}

class SignInFormDisplay extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { captcha, ...credentials } = values;
        this.props.loginRequest(credentials);
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const errors = [
      {
        username: 'User with that username already exists',
      },
    ];
    return (
      <>
        {/* {errors.length !== 0 && */}
        {/*   errors.map(error => <Alert message={error.username} type="error" showIcon />)} */}

        <Form onSubmit={this.handleSubmit}>
          <Form.Item style={{ width: '100%' }}>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                autoFocus
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item className="captcha">
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please verify you are human!' }],
            })(<Recaptcha />)}
          </Form.Item>

          <div className="signin__forgot">
            Forgot password?
            <Link to={PATH.forgotPassword}> Reset</Link>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Form.create()(SignInFormDisplay);
