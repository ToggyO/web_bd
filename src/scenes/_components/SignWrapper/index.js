import React from 'react';
import PropTypes from 'prop-types';

const SignWrapper = ({ children }) => <div style={{ paddingTop: 56 }}>{children}</div>;

SignWrapper.propTypes = {
  children: PropTypes.element,
};
export default SignWrapper;
