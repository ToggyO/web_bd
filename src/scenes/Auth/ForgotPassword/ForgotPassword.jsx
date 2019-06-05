import React from 'react';
import ROUTES from 'src/routes';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
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
