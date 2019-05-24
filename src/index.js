/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { message } from 'antd';
import history from 'services/history';
import setAuthHeaders from 'services/setAuthHeaders';
import { ROOTPATH, PATH } from 'paths';
import { getStore } from './store';
import { ProtectedUserRoute } from './routes/ProtectedUserRoute';
import { LoginContainer } from './scenes/Sign/Login';
import { ConfirmEmailContainer } from './scenes/Sign/ConfirmEmail';
import { Success } from './scenes/Sign/Success';
import { ForgotPassword } from './scenes/Sign/ForgotPassword';
import { ResetPassword } from './scenes/Sign/ResetPassword';
import { SetupAccountContainer } from './scenes/Sign/SetupAccount';
import { Settings } from './scenes/User/scenes/Settings';
import { Dashboard } from './scenes/User/scenes/Dashboard';
import { EditTrade } from './scenes/User/scenes/EditTrade';
import './global.less';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

message.config({
  top: 60,
});

const store = getStore();

if (localStorage.bdt) setAuthHeaders(localStorage.bdt);

const Home = ({ match }) => (
  <>
    <Header />
    <Route path={match.url} exact component={Dashboard} />
    <Footer />
  </>
);

const Auth = ({ match }) => (
  <div style={{ paddingTop: 56 }}>
    <Switch>
      <Route path={`${match.url}/${PATH.SIGN}`} exact component={LoginContainer} />
      <Route
        path={`${match.url}/${PATH.CONFIRM_EMAIL}`}
        exact
        component={ConfirmEmailContainer}
      />
      <Route path={`${match.url}/${PATH.SUCCESS}`} exact component={Success} />
      <Route
        path={`${match.url}/${PATH.FORGOT_PASSWORD}`}
        exact
        component={ForgotPassword}
      />
      <Route
        path={`${match.url}/${PATH.RESET_PASSWORD}`}
        exact
        component={ResetPassword}
      />
      <Route
        path={`${match.url}/${PATH.SETUP_ACCOUNT}`}
        exact
        component={SetupAccountContainer}
      />
    </Switch>
    <Footer />
  </div>
);

const User = ({ match }) => (
  <>
    <Header />
    <Switch>
      <ProtectedUserRoute
        path={`${match.url}/${PATH.USER_DASHBOARD}`}
        component={Dashboard}
      />
      <ProtectedUserRoute
        path={`${match.url}/${PATH.USER_SETTINGS}`}
        component={Settings}
      />
      <ProtectedUserRoute path={`${PATH.EDIT_TRADE}/:id`} component={EditTrade} />
    </Switch>
    <Footer />
  </>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <ProtectedUserRoute path={ROOTPATH.HOME} exact component={Home} />
        <Route path={ROOTPATH.AUTH} component={Auth} />
        <Route path={ROOTPATH.USER} component={User} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
