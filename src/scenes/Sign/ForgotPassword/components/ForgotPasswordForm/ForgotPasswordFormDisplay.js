/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import * as validations from 'validation-rules';
import './style.less';

class ForgotPasswordForm extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        this.props.forgotPasswordRequest(values);
        // console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item style={{ width: '100%' }}>
          {getFieldDecorator('email', {
            rules: validations.email,
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="reset-password__button"
            loading={loading}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ForgotPasswordForm);
