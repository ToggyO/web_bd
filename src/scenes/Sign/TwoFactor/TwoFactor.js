import React from 'react';
import AuthBox from 'src/components/AuthBox';
import { TwoFactorFormContainer } from './components/TwoFactorForm';

const TwoFactor = () => (
  <AuthBox header="Welcome to Bitcoins Direct!">
    <p>
      We care about your account's security and want your funds to be safe. That's why we
      allow transactions only with 2 factor authentication enabled.
    </p>
    <p>
      Enter phone number and get full access to website's functionality by setting 2
      factor authentication now.
    </p>
    <TwoFactorFormContainer />
  </AuthBox>
);

export default TwoFactor;
