import React from 'react';
import{ ROUTES }from '@config/constants';
import AuthBox from '@components/AuthBox';
import ToSignIn from '@components/ToSignIn';
import SignWrapper from '../../_components/SignWrapper';
import { ForgotPasswordFormContainer } from './components/ForgotPasswordForm';

const ForgotPassword = () => (
  <SignWrapper>
    <AuthBox header="Forgot password">
      <p>
        Enter your email and we will send your a link to reset your password. You may need to check
        your spam folder.
      </p>
      <ForgotPasswordFormContainer />
      <ToSignIn text="Back to Sign in" leftArrow goTo={ROUTES.LOGIN} />
    </AuthBox>
  </SignWrapper>
);
export default ForgotPassword;
