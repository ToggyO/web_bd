/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Input, Button } from 'antd';
import * as validations from '@services/validations';
import { notUndefinedObjectProps } from '@utils';

class EditFullNameFormDisplay extends React.Component {
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
        const fullName = values;
        this.props.editFullNameRequest(fullName);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="edit-form" hideRequiredMark>
        <Form.Item label="Enter new real name">
          {getFieldDecorator('fullName', {
            rules: validations.realname,
          })(<Input style={{ width: 368 }} placeholder="Riley Stivens" />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="primary-btn"
            disabled={this.state.submitDisabled}
            style={{ marginTop: 24 }}
          >
            Change real name
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EditFullNameFormDisplay);
