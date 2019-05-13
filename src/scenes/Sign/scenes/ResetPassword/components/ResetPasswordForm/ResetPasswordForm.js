/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './style.less';

class NormalLoginForm extends React.Component {
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
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={
                <Icon
                  className="ant-icon-translate"
                  type="mail"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
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
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
