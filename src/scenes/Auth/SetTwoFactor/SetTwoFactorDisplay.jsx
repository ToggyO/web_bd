import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { TwoFactorFormContainer } from './components/TwoFactorForm';

import SignWrapper from '@scenes/_components/SignWrapper';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import { AuthBox } from '@components/AuthBox';

const SetTwoFactorDisplay = ({ emailConfirmed }) => {
  useLayoutEffect(() => {
    if (!emailConfirmed) history.push(ROUTES.HOME);
  });

  return (
    <HelmetWrapper title="Set 2FA - Bitcoins Direct" description="Set 2FA page">
      <SignWrapper>
        <AuthBox header="Welcome to Bitcoins Direct!">
          <p>
            We care about your account's security and want your funds to be safe. That's why we allow
            transactions only with 2 factor authentication enabled.
          </p>
          <p>
            Enter phone number and get full access to website's functionality by setting 2 factor
            authentication now.
          </p>
          <TwoFactorFormContainer />
        </AuthBox>
      </SignWrapper>
    </HelmetWrapper>
  );
};

SetTwoFactorDisplay.propTypes = {
  emailConfirmed: PropTypes.bool,
};
export default SetTwoFactorDisplay;
