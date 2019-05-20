import React from 'react';
import { PATH } from 'paths';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import { ForgotPasswordFormContainer } from './components/ForgotPasswordForm';

const ForgotPassword = () => (
  <AuthBox header="Forgot password">
    <p>
      Enter your email and we will send your a link to reset your password. You may need
      to check your spam folder.
    </p>
    <ForgotPasswordFormContainer />
    <ToSignIn text="Back to Sign in" leftArrow goTo={PATH.SIGN} />
  </AuthBox>
);
export default ForgotPassword;
