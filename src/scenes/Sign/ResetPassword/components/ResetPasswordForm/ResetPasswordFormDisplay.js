/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import * as validations from 'validation-rules';
import { getQueries } from 'src/services/_utils';
import './style.less';

class ResetPasswordForm extends React.Component {
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    const { form, location } = this.props;
    const queries = getQueries(location);
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        this.props.resetPasswordRequest({ ...values, ...queries });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: validations.password,
          })(<Input.Password type="password" placeholder="Password" />)}
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
          })(<Input.Password type="password" placeholder="Confirm password" />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="reset-password__button"
            loading={isLoading}
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(props => <ResetPasswordForm {...props} />);
