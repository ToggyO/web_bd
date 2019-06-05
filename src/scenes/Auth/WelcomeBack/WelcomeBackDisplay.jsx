import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ROUTES from 'src/routes';
import AuthBox from 'src/components/AuthBox';
import history from 'src/services/history';
import SignWrapper from '../../_components/SignWrapper';
import { WelcomeBackFormContainer } from './components/WelcomeBackForm';

const WelcomeBackDisplay = ({ emailConfirmed, phoneNumberConfirmed }) => {
  useLayoutEffect(() => {
    if (!emailConfirmed || !phoneNumberConfirmed) history.push(ROUTES.HOME);
    if (emailConfirmed && !phoneNumberConfirmed) history.push(ROUTES.SET_2FA);
  });

  return (
    <SignWrapper>
      <AuthBox header="Welcome back!">
        <p>
          To get access, click «Get code» and enter the verification code you received on the linked
          phone.
        </p>
        <WelcomeBackFormContainer />
      </AuthBox>
    </SignWrapper>
  );
};

WelcomeBackDisplay.propTypes = {
  emailConfirmed: PropTypes.bool.isRequired,
  phoneNumberConfirmed: PropTypes.bool.isRequired,
};

export default WelcomeBackDisplay;