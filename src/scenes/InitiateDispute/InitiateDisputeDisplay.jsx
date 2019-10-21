/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Button, Upload, Icon } from 'antd';

import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import * as validations from '@services/validations';
import { ROUTES } from '@config/constants';
import './style.less';

const InitiateDisputeDisplay = ({ form, history, location }) => {
  useEffect(() => {
    if (!location.state) history.push(ROUTES.HOME);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="initiate-dispute">
          <h1>Initiate a dispute</h1>
          <Row>
            <Col md={12}>
              <Form onSubmit={handleSubmit} hideRequiredMark>
                <Form.Item label="Enter contact email address">
                  {form.getFieldDecorator('email', {
                    rules: validations.email,
                  })(<Input type="email" placeholder="riley411@gmail.com" />)}
                </Form.Item>
                <Form.Item label="Enter message">
                  {form.getFieldDecorator('message', {
                    initialValue: location.state ? location.state.text : '',
                  })(<Input.TextArea rows={5} placeholder="riley411@gmail.com" />)}
                </Form.Item>
                <Form.Item extra="Max size 5 Mb, only .jpeg, .jpg, .png, .pdf">
                  {form.getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  })(
                    <Upload name="logo" accept="image/jpeg, image/jpg, image/png, .pdf">
                      <Button style={{ height: 32 }}>
                        <Icon type="upload" /> Upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
                <Row gutter={8}>
                  <Col lg={7}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: 12 }}>
                      Send apply
                    </Button>
                  </Col>
                  <Col lg={5}>
                    <Button style={{ width: '100%' }}>Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </AppWrapperContainer>
  );
};

export default Form.create()(InitiateDisputeDisplay);
