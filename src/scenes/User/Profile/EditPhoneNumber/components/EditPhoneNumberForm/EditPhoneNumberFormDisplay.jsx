/* eslint-disable react/prop-types */
import React from 'react';
// import { Form, Input, Button, Select, Statistic } from 'antd';
import { Form, Input, Button, Select } from 'antd';
import * as validations from 'src/services/validations';
import { notUndefinedObjectProps } from 'src/utils';

const { Option } = Select;
// const { Countdown } = Statistic;

class EditPhoneNumberFormDisplay extends React.Component {
  state = {
    submitDisabled: true,
    // deadline: null,
    isGetCodeDisabled: false,
  };

  componentDidUpdate() {
    const { submitDisabled } = this.state;
    const { form } = this.props;

    if (submitDisabled) {
      const values = form.getFieldsValue();
      if (notUndefinedObjectProps(values)) this.setState({ submitDisabled: false });
    }
  }

  // method for switching back <button>Get Code</button> state
  // onFinish = () => {
  //   this.setState({ isGetCodeDisabled: false });
  // };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const phone = { phone: values.prefix + values.phone };
        this.props.editPhoneNumberRequest(phone);
        console.log(phone);
      }
    });
  };

  // handleGetCode = e => {
  //   const { userName, form } = this.props;
  //   e.preventDefault();
  //   form.validateFields(['prefix', 'phone'], (err, values) => {
  //     if (!err) {
  //       const phone = values.prefix + values.phone;
  //       this.props.smsCodeRequest({ userName, phone });
  //       this.codeInput.focus();
  //       // disable button for 60 seconds
  //       this.setState({ deadline: Date.now() + 60000, isGetCodeDisabled: true });
  //     }
  //   });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { deadline, isGetCodeDisabled } = this.state;
    const { isGetCodeDisabled } = this.state;

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
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: 368 }}
              placeholder="Phone number"
              disabled={isGetCodeDisabled}
            />
          )}
        </Form.Item>
        {/* <Form.Item>
          <div className="verification-code">
            {getFieldDecorator('smscode', {
              rules: validations.smscode,
            })(
              <Input
                placeholder="Verification code"
                style={{ width: 268 }}
                ref={input => {
                  this.codeInput = input;
                }}
              />
            )}

            <Button onClick={this.handleGetCode} disabled={isGetCodeDisabled} className="timer-btn">
              {isGetCodeDisabled ? (
                <Countdown value={deadline} suffix="s" format="ss" onFinish={this.onFinish} />
              ) : (
                'Get code'
              )}
            </Button>
          </div>
        </Form.Item> */}

        <Form.Item>
          <Button
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
