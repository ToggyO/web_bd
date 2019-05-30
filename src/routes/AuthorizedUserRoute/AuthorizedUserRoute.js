/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ROUTES from 'src/routes';
import authService from 'src/services/auth';

/* also need to check emailCOnfirmed and PhoneConfirmed when
	HomePage will be loaded
*/
const isLoggedIn = authService.checkTokens();

const AuthorizedUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to={ROUTES.HOME} />)}
  />
);

export default AuthorizedUserRoute;
