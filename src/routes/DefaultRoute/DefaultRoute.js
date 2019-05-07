import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const condition = true;

const DefaultRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (condition ? <Component {...props} /> : <Redirect to="/sign" />)}
  />
);

DefaultRoute.propTypes = {
  component: PropTypes.element,
};

export default DefaultRoute;
