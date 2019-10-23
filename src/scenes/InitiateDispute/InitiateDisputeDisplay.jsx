/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Button, Upload, Icon, message } from 'antd';

import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import superaxios from '@services/superaxios';
import * as validations from '@services/validations';
import { ROUTES } from '@config/constants';
import { getFromLocalState } from '@services/ls';

import { LOCAL_STORAGE_KEYS } from '@config';

import { parseBase64 } from '@utils';
import './style.less';

const InitiateDisputeDisplay = ({ form, history, location }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    beforeUpload: file => {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error('File should be smaller than 5Mb');
        return false;
      }
      setFileList([file]);
      return false;
    },
    multiple: false,
    fileList,
    accept: 'image/bmp, image/jpeg, image/jpg, image/png, application/pdf',
  };

  const handleUpload = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const { _message } = values;
        const reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = e => {
          setUploading(true);

          const data = parseBase64(e.target.result);

          superaxios({
            method: 'post',
            url: `/trade/${location.state.id}/disputed`,
            data: { message: _message, ...data },
            config: { headers: { 'Content-Type': 'text/plain' } },
          })
            .then(() => {
              setFileList([]);
              setUploading(false);

              history.replace(ROUTES.SETTINGS.ROOT);
              message.success('Dispute has been initiated');
            })
            .catch(() => {
              setUploading(false);
              message.error('Upload has been failed.');
            });
        };
      }
    });
  };

  useEffect(() => {
    if (!location.state) history.push(ROUTES.HOME);
  }, []);

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="initiate-dispute">
          <h1>Initiate a dispute</h1>
          <Row>
            <Col lg={12}>
              <Form hideRequiredMark>
                <Form.Item label="Email address">
                  {form.getFieldDecorator('email', {
                    initialValue: getFromLocalState(LOCAL_STORAGE_KEYS.USER).email,
                    rules: validations.email,
                  })(<Input type="email" placeholder="riley411@gmail.com" disabled />)}
                </Form.Item>
                <Form.Item label="Enter message">
                  {form.getFieldDecorator('_message', {
                    initialValue: location.state ? location.state.text : '',
                  })(<Input.TextArea rows={5} placeholder="Describe your problem here" />)}
                </Form.Item>
                <div style={{ marginBottom: 16 }}>
                  <Upload {...props}>
                    <Button style={{ height: 32 }}>
                      <Icon type="upload" /> Upload
                    </Button>
                  </Upload>
                  {fileList.length === 0 && (
                    <p style={{ color: 'rgba(0,0,0,0.45)', margin: '8px 0 16px' }}>
                      Max size 5 Mb, only .jpeg, .jpg, .png, .pdf
                    </p>
                  )}
                </div>
                <Row gutter={8}>
                  <Col lg={7}>
                    <Button
                      loading={uploading}
                      type="primary"
                      htmlType="submit"
                      style={{ width: '100%', marginBottom: 12 }}
                      onClick={handleUpload}
                    >
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
