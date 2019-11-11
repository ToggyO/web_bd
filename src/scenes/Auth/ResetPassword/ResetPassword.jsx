import React from 'react';
import PropTypes from 'prop-types';

import { ResetPasswordFormContainer } from './components/ResetPasswordForm';

import SignWrapper from '@scenes/_components/SignWrapper';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES } from '@config/constants';
import { AuthBox } from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';

const ResetPassword = ({ location: { search } }) => (
  <HelmetWrapper title="Reset Password - Bitcoins Direct" description="Reset password page">
    <SignWrapper>
      <AuthBox header="Reset password">
        <p>
          Choose a new password for this user account. The password will replace the old one, everything else
          about the user account will remain unchanged.
        </p>
        <ResetPasswordFormContainer location={search} />
        <ArrowLink text="Back to Sign in" leftArrow goTo={ROUTES.HOME} />
      </AuthBox>
    </SignWrapper>
  </HelmetWrapper>
);

ResetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
export default ResetPassword;
