import React from 'react';
import PropTypes from 'prop-types';
import AuthBox from 'src/components/AuthBox';
import SignWrapper from '../../_components/SignWrapper';

const ConfirmEmailDisplay = ({ email }) => (
  <SignWrapper>
    <AuthBox header="Account Created">
      <p>
        Please confirm your email <span style={{ color: '#2EAC82' }}>{email}</span> to proceed with
        the website.
      </p>
    </AuthBox>
  </SignWrapper>
);

ConfirmEmailDisplay.propTypes = {
  email: PropTypes.string,
};

ConfirmEmailDisplay.defaultProps = {
  email: '',
};

export default ConfirmEmailDisplay;
