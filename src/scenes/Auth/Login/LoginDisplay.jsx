import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import ROUTES from 'src/routes';
import historyService from 'src/services/history';
import AuthBox from 'src/components/AuthBox';
import SignWrapper from '../../_components/SignWrapper';
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
    if (!emailConfirmed) historyService.push(ROUTES.CONFIRM_EMAIL);
    if (emailConfirmed) historyService.push(ROUTES.SETUP_ACCOUNT);
    if (emailConfirmed && phoneNumberConfirmed) historyService.push(ROUTES.USER_DASHBOARD);
  }

  render() {
    // const tab = this.props.location.state.tab ;
    return (
      <SignWrapper>
        <AuthBox header="Sign in to Bitcoins Direct">
          <Tabs defaultActiveKey="1" className="bd-tabs">
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
  }
}

export default LoginDisplay;
