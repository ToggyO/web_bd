import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { WelcomeBackFormContainer } from './components/WelcomeBackForm';

import SignWrapper from '@scenes/_components/SignWrapper';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES } from '@config/constants';
import { AuthBox } from '@components/AuthBox';
import history from '@services/history';

const WelcomeBackDisplay = ({ emailConfirmed, phoneNumberConfirmed }) => {
  useLayoutEffect(() => {
    if (!emailConfirmed && !phoneNumberConfirmed) return history.push(ROUTES.CONFIRM_EMAIL);
    if (emailConfirmed && !phoneNumberConfirmed) return history.push(ROUTES.SET_2FA);
    return void 0;
  });

  return (
    <HelmetWrapper title="Welcome Back! - Bitcoins Direct" description="Welcome back page">
      <SignWrapper>
        <AuthBox header="Welcome back!">
          <p>
            To get access, click «Get code» and enter the verification code you received on the linked phone.
          </p>
          <WelcomeBackFormContainer />
        </AuthBox>
      </SignWrapper>
    </HelmetWrapper>
  );
};

WelcomeBackDisplay.propTypes = {
  emailConfirmed: PropTypes.bool.isRequired,
  phoneNumberConfirmed: PropTypes.bool.isRequired,
};

export default WelcomeBackDisplay;
