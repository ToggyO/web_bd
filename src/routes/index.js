/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { LoginContainer } from '../scenes/Auth/Login';
import { ConfirmEmailContainer } from '../scenes/Auth/ConfirmEmail';
import { SuccessDisplay } from '../scenes/Auth/Success';
import { WelcomeBackContainer } from '../scenes/Auth/WelcomeBack';
import { ForgotPassword } from '../scenes/Auth/ForgotPassword';
import { ResetPassword } from '../scenes/Auth/ResetPassword';
import { SetTwoFactorContainer } from '../scenes/Auth/SetTwoFactor';
import { SettingsContainer } from '../scenes/User/Profile/Settings';
import { EditEmailDisplay } from '../scenes/User/Profile/EditEmail';
import { EditFullNameDisplay } from '../scenes/User/Profile/EditFullName';
import { EditPhoneNumberDisplay } from '../scenes/User/Profile/EditPhoneNumber';
import { EditPasswordDisplay } from '../scenes/User/Profile/EditPassword';
import { RequestVerificationDisplay } from '../scenes/User/Profile/RequestVerification';
import { PostTradeContainer } from '../scenes/PostTrade';
import { DashboardContainer } from '../scenes/User/Dashboard';
import { HomePageDisplay } from '../scenes/HomePage';
import { TradesContainer } from '../scenes/Trades';
import { EditTradeContainer } from '../scenes/EditTrade';
import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRoute';

const Routes = ({ loading }) => (
  <Spin
    spinning={loading}
    tip="Restoring your session... Please, do not reload this page until it finishes."
    wrapperClassName="global-loading"
  >
    <Switch>
      <Route path={ROUTES.HOME} exact component={HomePageDisplay} />
      <Route path={ROUTES.TRADES.BUY} exact component={props => <TradesContainer {...props} type="buy" />} />
      <Route
        path={ROUTES.TRADES.SELL}
        exact
        component={props => <TradesContainer {...props} type="sell" />}
      />
      <Route
        path={ROUTES.TRADES.CREATE}
        exact
        component={props => <PostTradeContainer {...props} type="trade" />}
      />

      <Route path={ROUTES.CONFIRM_EMAIL} exact component={ConfirmEmailContainer} />
      <Route path={ROUTES.SET_2FA} exact component={SetTwoFactorContainer} />
      <Route path={ROUTES.WELCOME_BACK} exact component={WelcomeBackContainer} />

      <UnAuthRoute path={ROUTES.LOGIN} exact component={LoginContainer} />
      <UnAuthRoute path={ROUTES.SUCCESS} exact component={SuccessDisplay} />
      <UnAuthRoute path={ROUTES.FORGOT_PASSWORD} exact component={ForgotPassword} />
      <UnAuthRoute path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} />

      <AuthRoute path={ROUTES.USER_DASHBOARD} exact component={DashboardContainer} />
      <AuthRoute path={ROUTES.PROFILE.SETTINGS} exact component={SettingsContainer} />
      <AuthRoute path={ROUTES.PROFILE.EDIT_EMAIL} exact component={EditEmailDisplay} />
      <AuthRoute path={ROUTES.PROFILE.EDIT_FULLNAME} exact component={EditFullNameDisplay} />
      <AuthRoute path={ROUTES.PROFILE.EDIT_PHONENUMBER} exact component={EditPhoneNumberDisplay} />
      <AuthRoute path={ROUTES.PROFILE.EDIT_PASSWORD} exact component={EditPasswordDisplay} />
      <AuthRoute path={ROUTES.PROFILE.REQUEST_VERIFICATION} exact component={RequestVerificationDisplay} />

      <AuthRoute
        path={ROUTES.TRADES.EDIT_TRADE}
        exact
        component={props => <EditTradeContainer {...props} type="trade" />}
      />
    </Switch>
  </Spin>
);

function mapStateToProps(state) {
  return {
    loading: state._global.globalLoading,
  };
}

Routes.propTypes = {
  loading: PropTypes.bool,
};
export default connect(mapStateToProps)(Routes);
