/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import * as validations from '@services/validations';
import { notUndefinedObjectProps } from '@utils';

class EditPasswordFormDisplay extends React.Component {
  state = {
    submitDisabled: true,
  };

  componentDidUpdate(prevProps) {
    const { submitDisabled } = this.state;
    const { form, errors } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }

    if (errors !== prevProps.errors) {
      // if (errors.PasswordMismatch) message.error(errors.PasswordMismatch, 8);
      if (errors.PasswordMismatch) message.error('Incorrect old password', 8);
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.editPasswordRequest(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="edit-form" hideRequiredMark>
        <Form.Item label="Enter old password">
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: 'Please input your old password!' }],
          })(
            <Input.Password
              type="password"
              placeholder="Old password"
              visibilityToggle={false}
              style={{ width: 368 }}
            />
          )}
        </Form.Item>

        <Form.Item label="Enter new password">
          {getFieldDecorator('newPassword', {
            rules: validations.password,
          })(
            <Input.Password
              type="password"
              placeholder="New password"
              visibilityToggle={false}
              style={{ width: 368 }}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              type="password"
              placeholder="Confirm password"
              visibilityToggle={false}
              style={{ width: 368 }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="primary-btn"
            disabled={this.state.submitDisabled}
            style={{ marginTop: 24 }}
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditPasswordFormDisplay);
