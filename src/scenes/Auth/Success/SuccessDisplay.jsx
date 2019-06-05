import React from 'react';
import ROUTES from 'src/routes';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import SignWrapper from '../../_components/SignWrapper';

const SuccessDisplay = () => (
  <SignWrapper>
    <AuthBox header="Congratulations">
      <p>You have successfully signed up.</p>
      <p>Please sign in to your account to proceed to the website.</p>
      <ToSignIn text="Go to Sign in" goTo={ROUTES.HOME} />
    </AuthBox>
  </SignWrapper>
);

export default SuccessDisplay;
