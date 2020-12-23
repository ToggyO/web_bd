import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import SignWrapper from '@scenes/_components/SignWrapper';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES, APP_NAME } from '@config';
import history from '@services/history';
import { AuthBox } from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';

const ConfirmEmailDisplay = ({ email, emailConfirmed }) => {
  useLayoutEffect(() => {
    if (!email || emailConfirmed) history.push(ROUTES.HOME);
  });

  return (
    <HelmetWrapper title={`Confirm Email - ${APP_NAME}`} description="Confirm email page">
      <SignWrapper>
        <AuthBox header="Account Created">
          <p>
            Please confirm your email <span style={{ color: '#2EAC82' }}>{email}</span> to proceed with the
            website.
          </p>
          <ArrowLink leftArrow text="Back to Sign in" goTo={ROUTES.LOGIN} />
        </AuthBox>
      </SignWrapper>
    </HelmetWrapper>
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
