/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { message } from 'antd';
import history from 'src/services/history';
import ROUTES from './routes';
import { getStore } from './store';
import { AuthRoute } from './routes/AuthRoute';
import { UnAuthRoute } from './routes/UnAuthRoute';
import { LoginContainer } from './scenes/Auth/Login';
import { ConfirmEmailContainer } from './scenes/Auth/ConfirmEmail';
import { SuccessDisplay } from './scenes/Auth/Success';
import { WelcomeBackContainer } from './scenes/Auth/WelcomeBack';
import { ForgotPassword } from './scenes/Auth/ForgotPassword';
import { ResetPassword } from './scenes/Auth/ResetPassword';
import { SetTwoFactorContainer } from './scenes/Auth/SetTwoFactor';
import { Settings } from './scenes/User/scenes/Settings';
import { Dashboard } from './scenes/User/scenes/Dashboard';
import { HomePageContainer } from './scenes/HomePage';

import './global.less';

message.config({
  top: 60,
  duration: 8,
});

// HOME: '/',
// AUTH: '/auth',
// CONFIRM_EMAIL: '/confirm-email',
// SUCCESS: '/success',
// FORGOT_PASSWORD: '/forgot-password',
// RESET_PASSWORD: '/reset-password',
// SET_2FA: '/set-2fa',
// USER_SETTINGS: '/user/settings',
// USER_DASHBOARD: '/user/dashboard',
// EDIT_TRADE: '/trade/228/edit',

const store = getStore();
// if (!checkTokens()) logout();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
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
        <AuthRoute path={ROUTES.USER_SETTINGS} exact component={Settings} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
