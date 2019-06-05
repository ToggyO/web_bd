import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ROUTES from 'src/routes';
import history from 'src/services/history';
import AuthBox from 'src/components/AuthBox';
import SignWrapper from '../../_components/SignWrapper';

const ConfirmEmailDisplay = ({ email, emailConfirmed }) => {
  useLayoutEffect(() => {
    if (!email || emailConfirmed) history.push(ROUTES.HOME);
  });

  return (
    <SignWrapper>
      <AuthBox header="Account Created">
        <p>
          Please confirm your email <span style={{ color: '#2EAC82' }}>{email}</span> to proceed
          with the website.
        </p>
      </AuthBox>
    </SignWrapper>
  );
};

ConfirmEmailDisplay.propTypes = {
  email: PropTypes.string,
  emailConfirmed: PropTypes.bool,
};

ConfirmEmailDisplay.defaultProps = {
  email: '',
  emailConfirmed: false,
};

export default ConfirmEmailDisplay;
