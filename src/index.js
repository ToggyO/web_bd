import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from 'services/history';
import setAuthHeaders from 'services/setAuthHeaders';
import { PATH } from 'paths';
import { getStore } from './store';
import { RegisteredUserRoute } from './routes/RegisteredUserRoute';
import { ConfirmedUserRoute } from './routes/ConfirmedUserRoute';
import { ProtectedUserRoute } from './routes/ProtectedUserRoute';
import Main from './scenes';
import { LoginContainer } from './scenes/Sign/scenes/Login';
import { Success } from './scenes/Sign/scenes/Success';
import { ForgotPassword } from './scenes/Sign/scenes/ForgotPassword';
import { ResetPassword } from './scenes/Sign/scenes/ResetPassword';
import { TwoFactor } from './scenes/Sign/scenes/TwoFactor';
import { Settings } from './scenes/User/scenes/Settings';
import { Dashboard } from './scenes/User/scenes/Dashboard';
import { EditTrade } from './scenes/User/scenes/EditTrade';
import './global.less';

// guest
// registeredUser = just created account
// confirmedUser = created account + confirmed email
// protectedUser = created account + confirmed email + 2 factored
const store = getStore();

if (localStorage.bdToken) setAuthHeaders(localStorage.bdToken);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={Main} />
      <Route path={PATH.SIGN} component={LoginContainer} />
      <Route path={PATH.success} component={Success} />

      <RegisteredUserRoute path={PATH.forgotPassword} component={ForgotPassword} />
      <RegisteredUserRoute path={PATH.resetPassword} component={ResetPassword} />

      <ConfirmedUserRoute path={PATH.getTwoFactorAuth} component={TwoFactor} />

      <ProtectedUserRoute path={PATH.settings} component={Settings} />
      <ProtectedUserRoute path={PATH.dashboard} component={Dashboard} />
      <ProtectedUserRoute path={`${PATH.editTrade}/:id`} component={EditTrade} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
