import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// registeredUser = just created account
const condition = true;

const RegisteredUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (condition ? <Component {...props} /> : <Redirect to="/sign" />)}
  />
);

RegisteredUserRoute.propTypes = {
  component: PropTypes.func,
};

export default RegisteredUserRoute;
