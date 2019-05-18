import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';
import AuthBox from 'src/components/AuthBox';
import withFooter from 'src/components/withFooter';
import { SignInFormContainer } from './components/SignInForm';
import { SignUpFormContainer } from './components/SignUpForm';
import './style.less';

const { TabPane } = Tabs;

const LoginDisplay = ({ email, resetUser }) =>
  email ? (
    <AuthBox header="Account Created">
      <p>Please confirm your email {email} to proceed with the website.</p>
      {/* FIX */}
      <a href="#" className="tosignin__link" onClick={resetUser}>
        <Icon type="arrow-left" className="tosignin__icon" /> Back to Sign in
      </a>
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
  resetUser: PropTypes.func,
};

LoginDisplay.defaultProps = {
  email: null,
};

export default withFooter(LoginDisplay);
