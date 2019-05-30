import React from 'react';
import ROUTES from 'src/routes';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import SignWrapper from '../../_components/SignWrapper';

const Success = () => (
  <SignWrapper>
    <AuthBox header="Congratulations">
      <p>You have successfully signed up.</p>
      <p>Please sign in to your account to proceed to the website.</p>
      <ToSignIn text="Go to Sign in" goTo={ROUTES.SIGN} />
    </AuthBox>
  </SignWrapper>
);

export default Success;
