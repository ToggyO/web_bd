import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROOTPATH, PATH } from 'paths';
import { protectedUser } from '../selectors';

// protectedUser = created account + confirmed email + 2 factored

const ProtectedUserRoute = ({ isProtectedUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isProtectedUser ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${ROOTPATH.AUTH}/${PATH.SIGN}`} />
      )
    }
  />
);

function mapStateToProps(state) {
  return {
    isProtectedUser: protectedUser(state),
  };
}

ProtectedUserRoute.propTypes = {
  isProtectedUser: PropTypes.bool,
  component: PropTypes.func,
};

export default connect(mapStateToProps)(ProtectedUserRoute);
