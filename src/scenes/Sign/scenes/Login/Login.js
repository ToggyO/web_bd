import React from 'react';
import { Tabs } from 'antd';
import AuthBox from '../../components/AuthBox';
import withFooter from '../../components/withFooter';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import './style.less';

const { TabPane } = Tabs;

const Login = () => {
  function callback(key) {
    console.log(key);
  }
  return (
    <AuthBox header="Sign in to Bitcoins Direct">
      <Tabs defaultActiveKey="1" onChange={callback} className="login__tabs">
        <TabPane tab="Sign In" key="1">
          <SignInForm />
        </TabPane>
        <TabPane tab="Sign Up" key="2">
          <SignUpForm />
        </TabPane>
      </Tabs>
    </AuthBox>
  );
};

export default withFooter(Login);
