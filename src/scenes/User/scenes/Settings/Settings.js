import React from 'react';
import { List } from 'antd';
import { AppWrapperContainer } from '../../../_components/AppWrapper';
import { EditRealName } from './components/EditRealName';
import { EditEmail } from './components/EditEmail';
import { EditPhone } from './components/EditPhone';
import './style.less';

class Settings extends React.Component {
  state = {
    // user: {
    //   realname: '',
    //   phone: '',
    //   email: '',
    //   isConfirmed: true,
    // },
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
      <AppWrapperContainer>
        <div className="paper">
          <div className="user-settings">
            {!edit.realname && !edit.phone && !edit.email && !edit.password && (
              <>
                <h2 className="user-settings__header">Profile settings</h2>

                <List className="user-settings__list" itemLayout="horizontal">
                  <List.Item
                    className="user-settings__item"
                    actions={[
                      <a href="#" onClick={this.toggleRealNamePage}>
                        Change <span>name</span>
                      </a>,
                    ]}
                  >
                    <List.Item.Meta title="Real Name" description="John Riley" />
                    <a href="#" className="user-settings__verification">
                      Request Verification
                    </a>
                  </List.Item>
                  <List.Item className="user-settings__item">
                    <List.Item.Meta title="Username" description="riley419" />
                  </List.Item>
                  <List.Item
                    className="user-settings__item"
                    actions={[
                      <a href="#" onClick={this.togglePhonePage}>
                        Change <span>phone</span>
                      </a>,
                    ]}
                  >
                    <List.Item.Meta title="Bound Phone Number" description="139****8293" />
                  </List.Item>
                  <List.Item
                    className="user-settings__item"
                    actions={[
                      <a href="#" onClick={this.toggleEmailPage}>
                        Change <span>email</span>
                      </a>,
                    ]}
                  >
                    <List.Item.Meta title="Bound Email" description="ril***19@gmail.com" />
                  </List.Item>
                  <List.Item
                    className="user-settings__item"
                    actions={[
                      <a href="#">
                        Change <span>password</span>
                      </a>,
                    ]}
                  >
                    <List.Item.Meta title="Account Password" description="********" />
                  </List.Item>
                  <List.Item className="user-settings__item">
                    <List.Item.Meta title="Confirmed by other users" description="0" />
                  </List.Item>
                </List>
              </>
            )}
            {edit.realname && <EditRealName togglePage={this.toggleRealNamePage} />}
            {edit.email && <EditEmail togglePage={this.toggleEmailPage} />}
            {edit.phone && <EditPhone isConfirmed togglePage={this.togglePhonePage} />}
          </div>
        </div>
      </AppWrapperContainer>
    );
  }
}

export default Settings;
