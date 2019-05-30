/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';
import * as validations from 'src/services/validations';

class EditEmailForm extends React.Component {
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
    return (
      <Form onSubmit={this.handleSubmit} className="edit-form">
        <Form.Item label="Enter verification code" style={{ maxWidth: 368 }}>
          {getFieldDecorator('code', {
            rules: validations.smscode,
          })(<Input placeholder="000000" />)}
        </Form.Item>

        <Form.Item label="Enter new email address" style={{ maxWidth: 368 }}>
          {getFieldDecorator('email', {
            rules: validations.email,
          })(<Input type="email" placeholder="Email" />)}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Change email
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditEmailForm);
