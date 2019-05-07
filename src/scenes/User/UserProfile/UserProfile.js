import React from 'react';
import { List, Avatar as UserAvatar, message, Upload, Button, Icon } from 'antd';
import { EditRealName } from './components/EditRealName';
import { EditEmail } from './components/EditEmail';
import { EditPhone } from './components/EditPhone';
import withHeaderAndFooter from '../components/withHeaderAndFooter';
import './style.less';

import Avatar from './components/Avatar/Avatar';

const uploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class UserProfile extends React.Component {
  state = {
    user: {
      realname: '',
      phone: '',
      email: '',
      isConfirmed: true,
    },
    edit: {
      realname: false,
      phone: false,
      email: false,
      password: false,
    },
  };

  toggleRealNamePage = e => {
    e.preventDefault();
    this.setState(({ edit }) => ({ edit: { realname: !edit.realname } }));
  };

  toggleEmailPage = e => {
    e.preventDefault();
    this.setState(({ edit }) => ({ edit: { email: !edit.email } }));
  };

  togglePhonePage = e => {
    e.preventDefault();
    this.setState(({ edit }) => ({ edit: { phone: !edit.phone } }));
  };

  render() {
    const { edit } = this.state;
    return (
      <div className="container">
        <div className="user-profile ">
          {!edit.realname && !edit.phone && !edit.email && !edit.password && (
            <>
              <h2 className="user-profile__header">Profile settings</h2>
              <div className="settings">
                <List className="settings__list" itemLayout="horizontal">
                  <List.Item
                    className="settings__item"
                    actions={[<a onClick={this.toggleRealNamePage}>Change name</a>]}
                  >
                    <List.Item.Meta title="Real Name" description="John Riley" />
                    <a className="settings__verification">Request Verification</a>
                  </List.Item>
                  <List.Item className="settings__item">
                    <List.Item.Meta title="Username" description="riley419" />
                  </List.Item>
                  <List.Item
                    className="settings__item"
                    actions={[<a onClick={this.togglePhonePage}>Change phone</a>]}
                  >
                    <List.Item.Meta
                      title="Bound Phone Number"
                      description="139****8293"
                    />
                  </List.Item>
                  <List.Item
                    className="settings__item"
                    actions={[<a onClick={this.toggleEmailPage}>Change email</a>]}
                  >
                    <List.Item.Meta
                      title="Bound Email"
                      description="ril***19@gmail.com"
                    />
                  </List.Item>
                  <List.Item
                    className="settings__item"
                    actions={[<a>Change password</a>]}
                  >
                    <List.Item.Meta title="Account Password" description="********" />
                  </List.Item>
                  <List.Item className="settings__item">
                    <List.Item.Meta title="Confirmed by other users" description="0" />
                  </List.Item>
                </List>
                <div className="settings__aside">
                  <span className="settings__span">Avatar</span>

                  <Avatar size={64} icon="user" className="settings__avatar" />
                  <Upload {...uploadProps}>
                    <Button className="settings__btn">
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </div>
              </div>
            </>
          )}
          {edit.realname && <EditRealName togglePage={this.toggleRealNamePage} />}
          {edit.email && <EditEmail togglePage={this.toggleEmailPage} />}
          {edit.phone && <EditPhone isConfirmed togglePage={this.togglePhonePage} />}
        </div>
      </div>
    );
  }
}

export default withHeaderAndFooter(UserProfile);
