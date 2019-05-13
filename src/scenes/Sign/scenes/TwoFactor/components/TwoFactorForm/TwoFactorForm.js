// prop-types disabled for ant forms
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import * as validations from 'validation-rules';
import './style.less';
const { Option } = Select;

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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '0752',
    })(
      <Select style={{ width: 86 }} className="prefix-select">
        <Option value="0752">0752</Option>
        <Option value="0753">0753</Option>
      </Select>,
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: validations.phone,
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              placeholder="Phone number"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <div className="verification-code">
            {getFieldDecorator('smscode', {
              rules: validations.smscode,
            })(<Input placeholder="Verification code" />)}

            <Button>Get code</Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="signup__button">
            Get 2 Factor Authentification
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
