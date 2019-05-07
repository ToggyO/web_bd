import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// protectedUser = created account + confirmed email + 2 factored
const condition = true;

const ProtectedUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      condition ? <Component {...props} /> : <Redirect to="/twofactorauth" />
    }
  />
);
ProtectedUserRoute.propTypes = {
  component: PropTypes.func,
};

export default ProtectedUserRoute;
