import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const SignWrapper = ({ children }) => <div className="sign-wrapper">{children}</div>;

SignWrapper.propTypes = {
  children: PropTypes.element,
};
export default SignWrapper;
