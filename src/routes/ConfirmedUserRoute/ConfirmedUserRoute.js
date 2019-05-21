import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROOTPATH, PATH } from 'paths';
import { confirmedUser } from '../selectors';

// confirmedUser = created account + confirmed email

const ConfirmedUserRoute = ({ isConfirmedUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isConfirmedUser ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${ROOTPATH.AUTH}/${PATH.SIGN}`} />
      )
    }
  />
);

ConfirmedUserRoute.propTypes = {
  isConfirmedUser: PropTypes.bool,
  component: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isConfirmedUser: confirmedUser(state),
  };
}

export default connect(mapStateToProps)(ConfirmedUserRoute);
