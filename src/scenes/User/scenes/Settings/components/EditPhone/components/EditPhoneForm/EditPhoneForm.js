/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { phone } from 'validation-rules';
const { Option } = Select;

class EditPhoneForm extends React.Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('Submit to the server');
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
      <Form onSubmit={this.handleSubmit} className="edit-form">
        <Form.Item label="Enter new phone number">
          {getFieldDecorator('phone', {
            rules: phone,
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: 368 }}
              placeholder="Phone number"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 30 }}>
            Change phone number
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditPhoneForm);
