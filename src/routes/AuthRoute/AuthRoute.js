/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from 'src/routes';
import { checkTokens, userLogout } from 'src/services/auth';

const isLoggedIn = checkTokens();
// if (!isLoggedIn) userLogout();

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to={ROUTES.HOME} />)}
  />
);

export default AuthRoute;
