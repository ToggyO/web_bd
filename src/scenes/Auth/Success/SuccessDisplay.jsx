import React from 'react';
import{ ROUTES }from '@config/constants';
import AuthBox from '@components/AuthBox';
import ToSignIn from '@components/ToSignIn';
import SignWrapper from '../../_components/SignWrapper';

const SuccessDisplay = () => (
  <SignWrapper>
    <AuthBox header="Congratulations">
      <p>You have successfully signed up.</p>
      <p>Please sign in to your account to proceed to the website.</p>
      <ToSignIn text="Go to Sign in" goTo={ROUTES.LOGIN} />
    </AuthBox>
  </SignWrapper>
);

export default SuccessDisplay;
