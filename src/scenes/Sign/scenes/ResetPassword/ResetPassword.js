import React from 'react';
import { PATH } from 'router-paths';
import AuthBox from '../../components/AuthBox';
import ToSignIn from '../../components/ToSignIn';
import withFooter from '../../components/withFooter';
import { ResetPasswordForm } from './components/ResetPasswordForm';

const ResetPassword = () => (
  <AuthBox header="Forgot password">
    <p>
      Enter your email and we will send your a link to reset your password. You may need
      to check your spam folder.
    </p>
    <ResetPasswordForm />
    <ToSignIn text="Back to Sign in" leftArrow goTo={PATH.sign} />
  </AuthBox>
);
export default withFooter(ResetPassword);
