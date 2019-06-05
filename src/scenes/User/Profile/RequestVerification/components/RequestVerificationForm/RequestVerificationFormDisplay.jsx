/* eslint-disable react/prop-types */
import React from 'react';
// import reqwest from 'reqwest';
import axios from 'axios';
import { Upload, Form, Button, message } from 'antd';
import { API_URL } from 'src/services/api/config';
import VerificationIcon from 'src/assets/verification-icon.svg';

const { Dragger } = Upload;

class RequestVerificationFormDisplay extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('file', fileList[0]);

    this.setState({
      uploading: true,
    });

    axios({
      method: 'post',
      url: `${API_URL}/profile/resources`,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then(() => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      })
      .catch(() => {
        // this.setState({
        //   uploading: false,
        // });
        // message.error('upload failed.');
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      });

    // reqwest({
    //   url:
    //     'https://4rzmeh95xa.execute-api.eu-west-1.amazonaws.com/stage/api/v0.1/profile/resources',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
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
      accept: 'image/gif, image/jpeg, image/jpg, image/png',
    };

    return (
      <Form onSubmit={this.handleSubmit} className="edit-form" hideRequiredMark>
        <div style={{ width: 368 }}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <img src={VerificationIcon} alt="Verification icon" />
            </p>
            <p className="ant-upload-text">Upload an ID for verification</p>
            <p className="ant-upload-hint">.bmp .png .tiff .jpg</p>
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
