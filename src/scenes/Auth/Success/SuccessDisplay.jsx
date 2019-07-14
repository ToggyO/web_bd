import React from 'react';
import { ROUTES } from '@config/constants';
import { AuthBox } from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';
import SignWrapper from '../../_components/SignWrapper';

const SuccessDisplay = () => (
  <SignWrapper>
    <AuthBox header="Congratulations">
      <p>You have successfully signed up.</p>
      <p>Please sign in to your account to proceed to the website.</p>
      <ArrowLink text="Go to Sign in" goTo={ROUTES.LOGIN} />
    </AuthBox>
  </SignWrapper>
);

export default SuccessDisplay;
