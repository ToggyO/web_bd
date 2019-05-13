import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PATH } from 'router-paths';
import { RegisteredUserRoute } from './routes/RegisteredUserRoute';
import { ConfirmedUserRoute } from './routes/ConfirmedUserRoute';
import { ProtectedUserRoute } from './routes/ProtectedUserRoute';
import Main from './scenes';
import { Login } from './scenes/Sign/scenes/Login';
import { Success } from './scenes/Sign/scenes/Success';
import { Confirmation } from './scenes/Sign/scenes/Confirmation';
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

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Main} />
    <Route path={PATH.sign} component={Login} />
    <Route path={PATH.success} component={Success} />

    <RegisteredUserRoute path={PATH.confirmation} component={Confirmation} />
    <RegisteredUserRoute path={PATH.resetPassword} component={ResetPassword} />
    <ConfirmedUserRoute path={PATH.twoFactorAuth} component={TwoFactor} />
    <ProtectedUserRoute path={PATH.settings} component={Settings} />
    <ProtectedUserRoute path={PATH.dashboard} component={Dashboard} />
    <ProtectedUserRoute path={`${PATH.editTrade}/:id`} component={EditTrade} />
  </Router>,
  document.getElementById('root'),
);
