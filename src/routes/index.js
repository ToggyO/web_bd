/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spinner } from '@components/Spinner';
import { ROUTES } from '@config/constants';
import { NotFound } from '@scenes/404';
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
import { CreateAdContainer } from '../scenes/CreateAd';
import { DashboardContainer } from '../scenes/User/Dashboard';
import { HomePageDisplay } from '../scenes/HomePage';
import { AdsContainer } from '../scenes/Ads';
import { EditAdContainer } from '../scenes/EditAd';
import { InitiateTradeContainer } from '../scenes/InitiateTrade';
import { InitiateDisputeContainer } from '../scenes/InitiateDispute';
import { OtherProfileContainer } from '../scenes/User/OtherProfile';
import { TradeContainer } from '../scenes/Trade';
import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRoute';

const Routes = ({ loading }) => (
  <Spin
    spinning={loading}
    tip="Restoring your session... Please, do not reload this page until it finishes."
    wrapperClassName="global-loading"
    indicator={<Spinner />}
  >
    <Switch>
      <Route path={ROUTES.HOME} exact component={HomePageDisplay} />
      <Route path={ROUTES.ADS.BUY} exact component={props => <AdsContainer {...props} type="sell" />} />
      <Route path={ROUTES.ADS.SELL} exact component={props => <AdsContainer {...props} type="buy" />} />
      <Route path={ROUTES.ADS.CREATE} exact component={props => <CreateAdContainer {...props} type="ad" />} />
      <Route path={ROUTES.CONFIRM_EMAIL} exact component={ConfirmEmailContainer} />
      <Route path={ROUTES.SET_2FA} exact component={SetTwoFactorContainer} />
      <Route path={ROUTES.WELCOME_BACK} exact component={WelcomeBackContainer} />
      <Route path={ROUTES.TRADES.INITIATE} exact component={props => <InitiateTradeContainer {...props} />} />
      <Route path={ROUTES.USERS.OTHER} exact component={OtherProfileContainer} />

      <UnAuthRoute path={ROUTES.LOGIN} exact component={LoginContainer} />
      <UnAuthRoute path={ROUTES.SUCCESS} exact component={SuccessDisplay} />
      <UnAuthRoute path={ROUTES.FORGOT_PASSWORD} exact component={ForgotPassword} />
      <UnAuthRoute path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} />

      {[
        ROUTES.DASHBOARD.ROOT,
        ROUTES.DASHBOARD.CREATED,
        ROUTES.DASHBOARD.REQUESTS,
        ROUTES.DASHBOARD.ACTIVE,
        ROUTES.DASHBOARD.COMPLETED,
        ROUTES.DASHBOARD.CANCELED,
      ].map(path => (
        <AuthRoute key={path} path={path} exact component={DashboardContainer} />
      ))}
      <AuthRoute path={ROUTES.SETTINGS.ROOT} exact component={SettingsContainer} />
      <AuthRoute path={ROUTES.SETTINGS.EDIT_EMAIL} exact component={EditEmailDisplay} />
      <AuthRoute path={ROUTES.SETTINGS.EDIT_FULLNAME} exact component={EditFullNameDisplay} />
      <AuthRoute path={ROUTES.SETTINGS.EDIT_PHONENUMBER} exact component={EditPhoneNumberDisplay} />
      <AuthRoute path={ROUTES.SETTINGS.EDIT_PASSWORD} exact component={EditPasswordDisplay} />
      <AuthRoute path={ROUTES.SETTINGS.REQUEST_VERIFICATION} exact component={RequestVerificationDisplay} />
      <AuthRoute path={ROUTES.ADS.EDIT} exact component={props => <EditAdContainer {...props} type="ad" />} />
      <AuthRoute path={ROUTES.TRADES.TRADE} exact component={props => <TradeContainer {...props} />} />
      <AuthRoute path={ROUTES.DISPUTES.CREATE} exact component={InitiateDisputeContainer} />

      {/* REDIRECTS */}
      {[
        `${ROUTES.SETTINGS.ROOT}/name`,
        `${ROUTES.SETTINGS.ROOT}/phone`,
        `${ROUTES.SETTINGS.ROOT}/email`,
        `${ROUTES.SETTINGS.ROOT}/password`,
      ].map(path => (
        <AuthRoute key={path} path={path} exact component={() => <Redirect to={ROUTES.SETTINGS.ROOT} />} />
      ))}
      {/* /REDIRECTS */}

      {/* NOT FOUND PAGE */}
      <Route path="*" component={NotFound} />
      {/* /NOT FOUND PAGE */}
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
