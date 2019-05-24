import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { ROOTPATH, PATH } from 'paths';
import history from 'src/services/history';
import AuthBox from 'src/components/AuthBox';
import { SignInFormContainer } from './components/SignInForm';
import { SignUpFormContainer } from './components/SignUpForm';
import './style.less';

const { TabPane } = Tabs;

class LoginDisplay extends React.Component {
  static propTypes = {
    emailConfirmed: PropTypes.bool,
    phoneNumberConfirmed: PropTypes.bool,
  };

  componentDidUpdate() {
    const { emailConfirmed, phoneNumberConfirmed } = this.props;
    if (!emailConfirmed) history.push(`${ROOTPATH.AUTH}/${PATH.CONFIRM_EMAIL}`);
    if (emailConfirmed) history.push(`${ROOTPATH.AUTH}/${PATH.SETUP_ACCOUNT}`);
    if (emailConfirmed && phoneNumberConfirmed)
      history.push(`${ROOTPATH.USER}/${PATH.USER_DASHBOARD}`);
  }

  render() {
    return (
      <AuthBox header="Sign in to Bitcoins Direct">
        <Tabs defaultActiveKey="1" className="login__tabs">
          <TabPane tab="Sign In" key="1">
            <SignInFormContainer />
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <SignUpFormContainer />
          </TabPane>
        </Tabs>
      </AuthBox>
    );
  }
}

export default LoginDisplay;
