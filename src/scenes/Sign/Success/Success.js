import React from 'react';
import { PATH } from 'paths';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import withFooter from 'src/components/withFooter';

const Success = () => (
  <AuthBox header="Congratulations">
    <p>You have successfully signed up.</p>
    <p>Please sign in to your account to proceed to the website.</p>
    <ToSignIn text="Go to Sign in" goTo={PATH.SIGN} />
  </AuthBox>
);

export default withFooter(Success);
