import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import AuthBox from '@components/AuthBox';
import SignWrapper from '../../_components/SignWrapper';
import { SignInFormContainer } from './components/SignInForm';
import { SignUpFormContainer } from './components/SignUpForm';
import './style.less';

const { TabPane } = Tabs;

const LoginDisplay = props => {
  let defaultActiveKey = '1';
  const { state } = props.location;

  if (state) {
    if (state.toSignUp) defaultActiveKey = '2';
  }

  return (
    <SignWrapper>
      <AuthBox header="Sign in to Bitcoins Direct">
        <Tabs defaultActiveKey={defaultActiveKey} className="bd-tabs">
          <TabPane tab="Sign In" key="1">
            <SignInFormContainer />
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <SignUpFormContainer />
          </TabPane>
        </Tabs>
      </AuthBox>
    </SignWrapper>
  );
};

LoginDisplay.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      toSignUp: PropTypes.bool,
    }),
  }),
};

export default LoginDisplay;
