import React from 'react';

import SignWrapper from '@scenes/_components/SignWrapper';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES } from '@config';
import { AuthBox } from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';

const SuccessDisplay = () => (
  <HelmetWrapper title="Success! - Bitcoins Direct" description="Success page">
    <SignWrapper>
      <AuthBox header="Congratulations">
        <p>You have successfully signed up.</p>
        <p>Please sign in to your account to proceed to the website.</p>
        <ArrowLink text="Go to Sign in" goTo={ROUTES.LOGIN} />
      </AuthBox>
    </SignWrapper>
  </HelmetWrapper>
);

export default SuccessDisplay;
