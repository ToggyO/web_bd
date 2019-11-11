/* eslint-disable react/prop-types */
import React from 'react';

import { ForgotPasswordFormContainer } from './components/ForgotPasswordForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import SignWrapper from '@scenes/_components/SignWrapper';
import { ROUTES } from '@config/constants';
import { AuthBox } from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';

const ForgotPassword = ({ history: { location } }) => (
  <HelmetWrapper title="Forgot Password - Bitcoins Direct" description="Forgot password page">
    <SignWrapper>
      <AuthBox header="Forgot password">
        {location.state ? (
          <>
            <p>
              An email has been send a link to reset your password. You may need to check your spam folder.
            </p>
            <ArrowLink text="Back to Sign in" leftArrow goTo={ROUTES.LOGIN} />
          </>
        ) : (
          <>
            <p>
              Enter your email and we will send your a link to reset your password. You may need to check your
              spam folder.
            </p>
            <ForgotPasswordFormContainer />
            <ArrowLink text="Back to Sign in" leftArrow goTo={ROUTES.LOGIN} />
          </>
        )}
      </AuthBox>
    </SignWrapper>
  </HelmetWrapper>
);
export default ForgotPassword;
