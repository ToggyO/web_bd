/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from 'src/routes';
import authService from 'src/services/auth';

const isLoggedIn = authService.checkTokens();

const DefaultRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn ? <Redirect to={ROUTES.HOME} /> : <Component {...props} />)}
  />
);

export default DefaultRoute;
