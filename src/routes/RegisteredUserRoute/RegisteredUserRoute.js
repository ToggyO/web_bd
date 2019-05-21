import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROOTPATH, PATH } from 'paths';
import { justRegisteredUser } from '../selectors';

// registeredUser = just created account

const RegisteredUserRoute = ({ isJustRegisteredUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isJustRegisteredUser ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${ROOTPATH.AUTH}/${PATH.SIGN}`} />
      )
    }
  />
);

function mapStateToProps(state) {
  return {
    isJustRegisteredUser: justRegisteredUser(state),
  };
}

RegisteredUserRoute.propTypes = {
  isJustRegisteredUser: PropTypes.bool,
  component: PropTypes.func,
};

export default connect(mapStateToProps)(RegisteredUserRoute);
