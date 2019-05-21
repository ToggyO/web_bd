import React from 'react';
import PropTypes from 'prop-types';
import AuthBox from 'src/components/AuthBox';

const ConfirmEmailDisplay = ({ email, registeredEmail }) => (
  <AuthBox header="Account Created">
    <p>
      Please confirm your email{' '}
      <span style={{ color: '#2EAC82' }}>{email || registeredEmail}</span> to proceed with
      the website.
    </p>
  </AuthBox>
);

ConfirmEmailDisplay.propTypes = {
  email: PropTypes.string,
  registeredEmail: PropTypes.string,
};

ConfirmEmailDisplay.defaultProps = {
  email: '',
  registeredEmail: null,
};

export default ConfirmEmailDisplay;
