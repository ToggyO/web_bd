import React from 'react';
import { AuthBox } from '../components/AuthBox';
import { TwoFactorForm } from './components/TwoFactorForm';
import withFooter from '../components/withFooter';

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
    <TwoFactorForm />
  </AuthBox>
);

export default withFooter(TwoFactor);
