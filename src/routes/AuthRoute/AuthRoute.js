/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from 'src/routes';
import { checkTokens } from 'src/services/auth';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (checkTokens() ? <Component {...props} /> : <Redirect to={ROUTES.HOME} />)}
  />
);

export default AuthRoute;
