/* eslint-disable react/prop-types */
import React from 'react';
import superaxios from '@services/superaxios';
import { Upload, Form, Button, message } from 'antd';
import { API_URL } from '@config/constants';
import VerificationIcon from '@assets/verification-icon.svg';
import { parseBase64 } from '@utils';

const { Dragger } = Upload;

class RequestVerificationFormDisplay extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

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
        url: `${API_URL}/profile/resources`,
        data,
        config: { headers: { 'Content-Type': 'text/plain' } },
      })
        .then(() => {
          this.setState({
            fileList: [],
            uploading: false,
          });
          message.success('Uploaded successfully.');
        })
        .catch(() => {
          this.setState({
            uploading: false,
          });
          message.error('upload failed.');
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
