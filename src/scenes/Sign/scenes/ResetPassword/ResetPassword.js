import React from 'react';
import { PATH } from 'paths';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import withFooter from 'src/components/withFooter';
import { ResetPasswordFormDisplay } from './components/ResetPasswordForm';

const ResetPassword = () => (
  <AuthBox header="Reset password">
    <p>
      Choose a new password for this user account. The password will replace the old one,
      everything else about the user account will remain unchanged.
    </p>
    <ResetPasswordFormDisplay />
    <ToSignIn text="Back to Sign in" leftArrow goTo={PATH.HOME} />
  </AuthBox>
);
export default withFooter(ResetPassword);
