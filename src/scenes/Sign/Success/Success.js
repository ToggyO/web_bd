import React from 'react';
import { AuthBox } from '../components/AuthBox';
import { ToSignIn } from '../components/ToSignIn';
import withFooter from '../components/withFooter';

const Success = () => (
  <AuthBox header="Congratulations">
    <p>You have successfully signed up.</p>
    <p>Please sign in to your account to proceed to the website.</p>
    <ToSignIn text="Go to Sign in" direction="/sign" />
  </AuthBox>
);

export default Success;
