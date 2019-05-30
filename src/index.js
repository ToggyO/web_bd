/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { message } from 'antd';
import historyService from 'src/services/history';
import authService from 'src/services/auth';
import ROUTES from './routes';
import { getStore } from './store';
import { AuthorizedUserRoute } from './routes/AuthorizedUserRoute';
import { DefaultRoute } from './routes/DefaultRoute';
import { LoginContainer } from './scenes/Auth/Login';
import { ConfirmEmailContainer } from './scenes/Auth/ConfirmEmail';
import { Success } from './scenes/Auth/Success';
import { ForgotPassword } from './scenes/Auth/ForgotPassword';
import { ResetPassword } from './scenes/Auth/ResetPassword';
import { SetTwoFactor } from './scenes/Auth/SetTwoFactor';
import { Settings } from './scenes/User/scenes/Settings';
import { Dashboard } from './scenes/User/scenes/Dashboard';
import { HomePageDisplay } from './scenes/HomePage';

import './global.less';

message.config({
  top: 60,
  duration: 8,
});

const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={historyService}>
      <Switch>
        <Route
          path={ROUTES.HOME}
          exact
          // render={props =>
          //   authService.checkTokens() ? (
          //     <HomePageDisplay {...props} />
          //   ) : (
          //     <LoginContainer {...props} />
          //   )
          // }
          render={props => <HomePageDisplay {...props} />}
        />
        <DefaultRoute path={ROUTES.AUTH} exact component={LoginContainer} />
        <DefaultRoute path={ROUTES.CONFIRM_EMAIL} exact component={ConfirmEmailContainer} />
        <DefaultRoute path={ROUTES.SUCCESS} exact component={Success} />
        <DefaultRoute path={ROUTES.FORGOT_PASSWORD} exact component={ForgotPassword} />
        <DefaultRoute path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} />
        <DefaultRoute path={ROUTES.SET_2FA} exact component={SetTwoFactor} />
        <AuthorizedUserRoute path={ROUTES.USER_DASHBOARD} exact component={Dashboard} />
        <AuthorizedUserRoute path={ROUTES.USER_SETTINGS} exact component={Settings} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
