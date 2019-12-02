/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import { SettingsContainer } from '../scenes/Me/Profile/Settings';
import { EditEmailDisplay } from '../scenes/Me/Profile/EditEmail';
import { EditFullNameDisplay } from '../scenes/Me/Profile/EditFullName';
import { EditPhoneNumberDisplay } from '../scenes/Me/Profile/EditPhoneNumber';
import { EditPasswordDisplay } from '../scenes/Me/Profile/EditPassword';
import { RequestVerificationDisplay } from '../scenes/Me/Profile/RequestVerification';
import { CreateAdContainer } from '../scenes/CreateAd';
import { DashboardContainer } from '../scenes/Me/Dashboard';
import { HomePage } from '../scenes/HomePage';
import { AdsContainer } from '../scenes/Ads';
import { EditAdContainer } from '../scenes/EditAd';
import { InitiateTradeContainer } from '../scenes/InitiateTrade';
import { InitiateDispute } from '../scenes/InitiateDispute';
import { UserContainer } from '../scenes/User';
import { TradeContainer } from '../scenes/Trade';

import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRoute';

import { NotFound } from '@scenes/404';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';

import { ROUTES } from '@config/constants';

const LoginContainer = loadable(() => import('../scenes/Auth/Login/LoginContainer'));
const SuccessDisplay = loadable(() => import('../scenes/Auth/Success/SuccessDisplay'));
const ForgotPassword = loadable(() => import('../scenes/Auth/ForgotPassword/ForgotPassword'));
const ResetPassword = loadable(() => import('../scenes/Auth/ResetPassword/ResetPassword'));
const ConfirmEmailContainer = loadable(() => import('../scenes/Auth/ConfirmEmail/ConfirmEmailContainer'));
const SetTwoFactorContainer = loadable(() => import('../scenes/Auth/SetTwoFactor/SetTwoFactorContainer'));
const WelcomeBackContainer = loadable(() => import('../scenes/Auth/WelcomeBack/WelcomeBackContainer'));

const Routes = () => (
  <Switch>
    <UnAuthRoute path={ROUTES.LOGIN} exact component={LoginContainer} />
    <UnAuthRoute path={ROUTES.SUCCESS} exact component={SuccessDisplay} />
    <UnAuthRoute path={ROUTES.FORGOT_PASSWORD} exact component={ForgotPassword} />
    <UnAuthRoute path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} />

    <Route path={ROUTES.CONFIRM_EMAIL} exact component={ConfirmEmailContainer} />
    <Route path={ROUTES.SET_2FA} exact component={SetTwoFactorContainer} />
    <Route path={ROUTES.WELCOME_BACK} exact component={WelcomeBackContainer} />

    <Route path={ROUTES[404]} exact component={NotFound} />

    <AppWrapperContainer>
      <Switch>
        <Route path={ROUTES.HOME} exact component={HomePage} />
        <Route path={ROUTES.ADS.BUY} exact component={props => <AdsContainer {...props} type="sell" />} />
        <Route path={ROUTES.ADS.SELL} exact component={props => <AdsContainer {...props} type="buy" />} />
        <Route
          path={ROUTES.ADS.CREATE}
          exact
          component={props => <CreateAdContainer {...props} type="ad" />}
        />
        <Route
          path={ROUTES.TRADES.INITIATE}
          exact
          component={props => <InitiateTradeContainer {...props} />}
        />
        <Route path={ROUTES.USERS.OTHER} exact component={UserContainer} />

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
        <AuthRoute
          path={ROUTES.ADS.EDIT}
          exact
          component={props => <EditAdContainer {...props} type="ad" />}
        />
        <AuthRoute path={ROUTES.TRADES.TRADE} exact component={props => <TradeContainer {...props} />} />
        <AuthRoute path={ROUTES.DISPUTES.CREATE} exact component={InitiateDispute} />

        {[
          `${ROUTES.SETTINGS.ROOT}/name`,
          `${ROUTES.SETTINGS.ROOT}/phone`,
          `${ROUTES.SETTINGS.ROOT}/email`,
          `${ROUTES.SETTINGS.ROOT}/password`,
        ].map(path => (
          <AuthRoute key={path} path={path} exact component={() => <Redirect to={ROUTES.SETTINGS.ROOT} />} />
        ))}
        <Redirect to="/404" />
      </Switch>
    </AppWrapperContainer>
  </Switch>
);

export default Routes;
