/* eslint-disable react/prop-types */
import React from 'react';
import { ROUTES } from '@config/constants';
import { AuthBox } from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';
import SignWrapper from '../../_components/SignWrapper';
import { ForgotPasswordFormContainer } from './components/ForgotPasswordForm';

const ForgotPassword = ({ history: { location } }) => (
  <SignWrapper>
    <AuthBox header="Forgot password">
      {location.state ? (
        <>
          <p>An email has been send a link to reset your password. You may need to check your spam folder.</p>
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
);
export default ForgotPassword;
