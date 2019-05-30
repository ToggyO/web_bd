/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';
import * as validations from 'src/services/validations';

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
    return (
      <Form onSubmit={this.handleSubmit} className="edit-form">
        <Form.Item label="Enter new real name">
          {getFieldDecorator('realname', {
            rules: validations.realname,
          })(<Input style={{ width: 368 }} placeholder="Riley Stivens" />)}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 24 }}>
            Change real name
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditPhoneForm);
