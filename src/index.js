import '@babel/polyfill';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { RegisteredUserRoute } from './routes/RegisteredUserRoute';
import { ConfirmedUserRoute } from './routes/ConfirmedUserRoute';
import { ProtectedUserRoute } from './routes/ProtectedUserRoute';
import Main from './scenes';
import { Login } from './scenes/Sign/Login';
import { Success } from './scenes/Sign/Success';
import { Confirmation } from './scenes/Sign/Confirmation';
import { ResetPassword } from './scenes/Sign/ResetPassword';
import { TwoFactor } from './scenes/Sign/TwoFactor';
import { UserProfile } from './scenes/User/UserProfile';
import './global.less';

// guest
// registeredUser = just created account
// confirmedUser = created account + confirmed email
// protectedUser = created account + confirmed email + 2 factored

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Main} />
    <Route path="/sign" component={Login} />
    <Route path="/success" component={Success} />

    <RegisteredUserRoute path="/confirmation" component={Confirmation} />
    <RegisteredUserRoute path="/reset" component={ResetPassword} />
    <ConfirmedUserRoute path="/twofactorauth" component={TwoFactor} />
    <ProtectedUserRoute path="/user" component={UserProfile} />
  </Router>,
  document.getElementById('root'),
);
