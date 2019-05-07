import React from 'react';
import { AuthBox } from '../components/AuthBox';
import withFooter from '../components/withFooter';
import { ResetPasswordForm } from './components/ResetPasswordForm';
import { ToSignIn } from '../components/ToSignIn';

const ResetPassword = () => (
  <AuthBox header="Forgot password">
    <p>
      Enter your email and we will send your a link to reset your password. You may need
      to check your spam folder.
    </p>
    <ResetPasswordForm />
    <ToSignIn text="Back to Sign in" leftArrow direction="/sign" />
  </AuthBox>
);
export default withFooter(ResetPassword);
