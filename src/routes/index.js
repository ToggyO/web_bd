/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

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

    <AppWrapperContainer>
      <Switch>
        <Route path={ROUTES.HOME} exact component={HomePageDisplay} />
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
        <Route path={ROUTES.USERS.OTHER} exact component={OtherProfileContainer} />

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
        <AuthRoute path={ROUTES.DISPUTES.CREATE} exact component={InitiateDisputeContainer} />

        {[
          `${ROUTES.SETTINGS.ROOT}/name`,
          `${ROUTES.SETTINGS.ROOT}/phone`,
          `${ROUTES.SETTINGS.ROOT}/email`,
          `${ROUTES.SETTINGS.ROOT}/password`,
        ].map(path => (
          <AuthRoute key={path} path={path} exact component={() => <Redirect to={ROUTES.SETTINGS.ROOT} />} />
        ))}
        {/* NOT FOUND PAGE */}
        <Route path="*" component={NotFound} />
        {/* /NOT FOUND PAGE */}
      </Switch>
    </AppWrapperContainer>
  </Switch>
);

export default Routes;
