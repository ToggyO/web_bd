import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'services/history';
import setAuthHeaders from 'services/setAuthHeaders';
import { PATH } from 'paths';
import { getStore } from './store';
import { RegisteredUserRoute } from './routes/RegisteredUserRoute';
import { ConfirmedUserRoute } from './routes/ConfirmedUserRoute';
import { ProtectedUserRoute } from './routes/ProtectedUserRoute';
import Main from './scenes';
import { LoginContainer } from './scenes/Sign/Login';
import { Success } from './scenes/Sign/Success';
import { ForgotPassword } from './scenes/Sign/ForgotPassword';
import { ResetPassword } from './scenes/Sign/ResetPassword';
import { TwoFactor } from './scenes/Sign/TwoFactor';
import { Settings } from './scenes/User/scenes/Settings';
import { Dashboard } from './scenes/User/scenes/Dashboard';
import { EditTrade } from './scenes/User/scenes/EditTrade';
import './global.less';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

// guest
// registeredUser = just created account
// confirmedUser = created account + confirmed email
// protectedUser = created account + confirmed email + 2 factored
const store = getStore();

if (localStorage.bdToken) setAuthHeaders(localStorage.bdToken);

const Home = ({ match }) => (
  <>
    <Header />
    <Route path={match.url} component={User} />
    <Footer />
  </>
);

const Auth = ({ match }) => (
  <div style={{ paddingTop: 80 }}>
    <Switch>
      <Route path={`${match.url}/${PATH.SIGN}`} exact component={LoginContainer} />
      <Route path={`${match.url}/${PATH.SUCCESS}`} exact component={Success} />
      <RegisteredUserRoute
        path={`${match.url}/${PATH.FORGOT_PASSWORD}`}
        exact
        component={ForgotPassword}
      />
      <RegisteredUserRoute
        path={`${match.url}/${PATH.RESET_PASSWORD}`}
        exact
        component={ResetPassword}
      />
      <ConfirmedUserRoute
        path={`${match.url}/${PATH.SET_2FA}`}
        exact
        component={TwoFactor}
      />
    </Switch>
    <Footer />
  </div>
);

const User = ({ match }) => (
  <>
    <Header />
    <Switch>
      {['/', PATH.USER_DASHBOARD].map((path, index) => (
        <ProtectedUserRoute path={path} exact component={Dashboard} key={index} />
      ))}

      <ProtectedUserRoute path={PATH.USER_SETTINGS} component={Settings} />

      <ProtectedUserRoute path={`${PATH.EDIT_TRADE}/:id`} component={EditTrade} />
    </Switch>
    <Footer />
  </>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/auth" component={Auth} />
      </Switch>

      {/*       <Route exact path={PATH.HOME} component={Main} /> */}
      {/*       <Route path={PATH.SIGN} component={LoginContainer} /> */}
      {/*       <Route path={PATH.SUCCESS} component={Success} /> */}
      {/*  */}
      {/*       <RegisteredUserRoute path={PATH.FORGOT_PASSWORD} component={ForgotPassword} /> */}
      {/*       <RegisteredUserRoute path={PATH.RESET_PASSWORD} component={ResetPassword} /> */}
      {/*  */}
      {/*       <ConfirmedUserRoute path={PATH.SET_2FA} component={TwoFactor} /> */}
      {/*  */}
      {/*       <ProtectedUserRoute path={PATH.USER_SETTINGS} component={Settings} /> */}
      {/*       <ProtectedUserRoute path={PATH.USER_DASHBOARD} component={Dashboard} /> */}
      {/*       <ProtectedUserRoute path={`${PATH.EDIT_TRADE}/:id`} component={EditTrade} /> */}
    </Router>
  </Provider>,
  document.getElementById('root'),
);
