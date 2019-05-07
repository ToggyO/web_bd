import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// confirmedUser = created account + confirmed email
const condition = true;

const ConfirmedUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      condition ? <Component {...props} /> : <Redirect to="/emailconfirm" />
    }
  />
);

ConfirmedUserRoute.propTypes = {
  component: PropTypes.func,
};

export default ConfirmedUserRoute;
