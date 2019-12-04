/* eslint-disable react/prop-types */
import React from 'react';
import { Upload, Form, Button, message } from 'antd';

import history from '@services/history';
import superaxios from '@services/superaxios';
import { ROUTES } from '@config';

import { parseBase64 } from '@utils';

import VerificationIcon from '@assets/verification-icon.svg';

const { Dragger } = Upload;

class RequestVerificationFormDisplay extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  componentDidMount() {
    const { verificationStatus } = this.props;
    if (verificationStatus === 'Pending' || verificationStatus === 'Verified') {
      history.push(ROUTES.SETTINGS.ROOT);
    }
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = e => {
      this.setState({
        uploading: true,
      });
      const data = parseBase64(e.target.result);

      superaxios({
        method: 'post',
        url: '/profile/resources',
        data,
        config: { headers: { 'Content-Type': 'text/plain' } },
      })
        .then(() => {
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success('Uploaded successfully.');
          history.replace(ROUTES.SETTINGS.ROOT);
        })
        .catch(() => {
          this.setState({
            uploading: false,
          });
          message.error('Upload failed.');
        });
    };
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          message.error('File should be smaller than 5Mb');
          return false;
        }
        this.setState({ fileList: [file] });
        return false;
      },
      multiple: false,
      fileList,
      accept: 'image/bmp, image/jpeg, image/jpg, image/png',
    };

    return (
      <Form onSubmit={this.handleSubmit} className="edit-form" hideRequiredMark>
        <div style={{ width: 368 }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <img src={VerificationIcon} alt="Verification icon" />
            </p>
            <p className="ant-upload-text">Upload an ID for verification</p>
            <p className="ant-upload-hint">.bmp .png .jpg</p>
          </Dragger>
        </div>

        <Form.Item>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Sending' : 'Send for verification'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(RequestVerificationFormDisplay);
