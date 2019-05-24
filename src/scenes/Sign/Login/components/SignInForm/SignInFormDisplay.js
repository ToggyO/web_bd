/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Icon, Input, Button, message } from 'antd';
import { PATH } from 'paths';
import './style.less';

class Recaptcha extends React.Component {
  doCaptcha = result => {
    this.props.onChange(result);
    this.props.doCaptcha(result);
  };

  render() {
    return (
      <ReCAPTCHA
        // dev
        sitekey="6LfFtqEUAAAAAD7I_-zjtYgRn45xiK7WpCiMI0cQ"
        // prod
        // sitekey="6LcOpKQUAAAAAJRDZiTq5zISgnS4pGGTak7Uc6vY"
        onChange={this.doCaptcha}
      />
    );
  }
}

class SignInFormDisplay extends React.Component {
  state = {
    captcha: undefined,
    submitDisabled: true,
  };

  componentDidUpdate(prevProps) {
    const { captcha, submitDisabled } = this.state;
    const { errors, form } = this.props;
    /*
      we want to enable Submit button when all form fields are filled
      because of Captcha's ref, we're doing all that stuff below
    */
    if (captcha && submitDisabled) {
      const { userName, password } = form.getFieldsValue();
      if (userName && password) this.setState({ submitDisabled: false });
    }

    if (errors !== prevProps.errors) {
      if (errors[0]) message.error('Your login or password was incorrect', 4);
    }
  }

  doCaptcha = result => {
    this.setState({ captcha: result });
  };

  handleSubmit = e => {
    const { signInRequest, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { captcha, ...credentials } = values;
        signInRequest(credentials);
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
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
            })(<Recaptcha doCaptcha={this.doCaptcha} />)}
          </Form.Item>

          <div className="signin__forgot">
            Forgot password?
            <Link to={PATH.FORGOT_PASSWORD}> Reset</Link>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={this.state.submitDisabled}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Form.create()(SignInFormDisplay);
