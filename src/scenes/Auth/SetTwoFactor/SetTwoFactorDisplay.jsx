import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import { AuthBox } from '@components/AuthBox';
import SignWrapper from '../../_components/SignWrapper';
import { TwoFactorFormContainer } from './components/TwoFactorForm';

const SetTwoFactorDisplay = ({ emailConfirmed }) => {
  useLayoutEffect(() => {
    if (!emailConfirmed) history.push(ROUTES.HOME);
  });

  return (
    <SignWrapper>
      <AuthBox header="Welcome to Bitcoins Direct!">
        <p>
          We care about your account's security and want your funds to be safe. That's why we allow
          transactions only with 2 factor authentication enabled.
        </p>
        <p>
          Enter phone number and get full access to website's functionality by setting 2 factor authentication
          now.
        </p>
        <TwoFactorFormContainer />
      </AuthBox>
    </SignWrapper>
  );
};

SetTwoFactorDisplay.propTypes = {
  emailConfirmed: PropTypes.bool.isRequired,
};
export default SetTwoFactorDisplay;
