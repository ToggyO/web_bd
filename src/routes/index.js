import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from './AuthRoute';
import { UnAuthRoute } from './UnAuthRoute';
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
import { Dashboard } from '../scenes/User/Dashboard';
import { HomePageContainer } from '../scenes/HomePage';

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CONFIRM_EMAIL: '/confirm-email',
  SUCCESS: '/success',
  SET_2FA: '/set-2fa',
  WELCOME_BACK: '/welcome-back',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: {
    SETTINGS: '/profile',
    EDIT_FULLNAME: '/profile/edit-fullname',
    EDIT_EMAIL: '/profile/edit-email',
    EDIT_PHONENUMBER: '/profile/edit-phonenumber',
    EDIT_PASSWORD: '/profile/edit-password',
    REQUEST_VERIFICATION: '/profile/request-verification',
  },
  USER_DASHBOARD: '/dashboard',
  EDIT_TRADE: '/trade/228/edit',
};

export const BitcoinsDirectRoutes = () => (
  <Switch>
    <Route path={ROUTES.HOME} exact component={HomePageContainer} />

    <Route path={ROUTES.CONFIRM_EMAIL} exact component={ConfirmEmailContainer} />
    <Route path={ROUTES.SET_2FA} exact component={SetTwoFactorContainer} />
    <Route path={ROUTES.WELCOME_BACK} exact component={WelcomeBackContainer} />

    <UnAuthRoute path={ROUTES.LOGIN} exact component={LoginContainer} />
    <UnAuthRoute path={ROUTES.SUCCESS} exact component={SuccessDisplay} />
    <UnAuthRoute path={ROUTES.FORGOT_PASSWORD} exact component={ForgotPassword} />
    <UnAuthRoute path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} />

    <AuthRoute path={ROUTES.USER_DASHBOARD} exact component={Dashboard} />
    <AuthRoute path={ROUTES.PROFILE.SETTINGS} exact component={SettingsContainer} />
    <AuthRoute path={ROUTES.PROFILE.EDIT_EMAIL} exact component={EditEmailDisplay} />
    <AuthRoute path={ROUTES.PROFILE.EDIT_FULLNAME} exact component={EditFullNameDisplay} />
    <AuthRoute path={ROUTES.PROFILE.EDIT_PHONENUMBER} exact component={EditPhoneNumberDisplay} />
    <AuthRoute path={ROUTES.PROFILE.EDIT_PASSWORD} exact component={EditPasswordDisplay} />
    <AuthRoute path={ROUTES.PROFILE.REQUEST_VERIFICATION} exact component={RequestVerificationDisplay} />
  </Switch>
);

export default ROUTES;
