import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import AuthBox from 'src/components/AuthBox';
import { SignInFormContainer } from './components/SignInForm';
import { SignUpFormContainer } from './components/SignUpForm';
import './style.less';

const { TabPane } = Tabs;

const LoginDisplay = ({ email }) =>
  email ? (
    <AuthBox header="Account Created">
      <p>
        Please confirm your email <span style={{ color: '#2EAC82' }}>{email}</span> to
        proceed with the website.
      </p>
    </AuthBox>
  ) : (
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

LoginDisplay.propTypes = {
  email: PropTypes.string,
};

LoginDisplay.defaultProps = {
  email: null,
};

export default LoginDisplay;
