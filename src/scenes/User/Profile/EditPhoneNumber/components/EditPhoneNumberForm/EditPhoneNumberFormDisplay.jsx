/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import * as validations from '@services/validations';
import { notUndefinedObjectProps } from '@utils';

const { Option } = Select;

class EditPhoneNumberFormDisplay extends React.Component {
  state = {
    submitDisabled: true,
  };

  componentDidUpdate() {
    const { submitDisabled } = this.state;
    const { form } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }
  }

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const phone = { phone: values.prefix + values.phone };
        this.props.editPhoneNumberRequest(phone);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '1',
    })(
      <Select style={{ width: 86 }} className="prefix-select">
        <Option value="1">1</Option>
        <Option value="7">7</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: validations.phone,
          })(<Input addonBefore={prefixSelector} style={{ width: 368 }} placeholder="Phone number" />)}
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="signup__button primary-btn"
            disabled={this.state.submitDisabled}
          >
            Change phone number
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditPhoneNumberFormDisplay);
