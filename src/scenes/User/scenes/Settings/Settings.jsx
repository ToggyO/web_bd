import React from 'react';
import { Tabs } from 'antd';
import { AppWrapperContainer } from '../../../_components/AppWrapper';
import { ProfileSettingsDisplay } from './components/ProfileSettings';
import { EditRealName } from './components/EditRealName';
import { EditEmail } from './components/EditEmail';
import { EditPhone } from './components/EditPhone';
import './style.less';

const { TabPane } = Tabs;

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
          <div className="user-settings custom-tabs">
            <Tabs defaultActiveKey="1" tabPosition="left" size="small">
              <TabPane tab="Profile settings" key="1">
                <ProfileSettingsDisplay />
              </TabPane>

              {/* {!edit.realname && !edit.phone && !edit.email && !edit.password && (

            )}
            {edit.realname && <EditRealName togglePage={this.toggleRealNamePage} />}
            {edit.email && <EditEmail togglePage={this.toggleEmailPage} />}
						{edit.phone && <EditPhone isConfirmed togglePage={this.togglePhonePage} />} */}
            </Tabs>
          </div>
        </div>
      </AppWrapperContainer>
    );
  }
}

export default Settings;
