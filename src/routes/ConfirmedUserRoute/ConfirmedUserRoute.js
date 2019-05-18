import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PATH } from 'paths';

// confirmedUser = created account + confirmed email

const ConfirmedUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.bdToken ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

ConfirmedUserRoute.propTypes = {
  component: PropTypes.func,
};

export default ConfirmedUserRoute;
