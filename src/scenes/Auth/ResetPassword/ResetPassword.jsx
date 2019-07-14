import React from 'react';
import PropTypes from 'prop-types';
import { ROUTES } from '@config/constants';
import AuthBox from '@components/AuthBox';
import { ArrowLink } from '@components/ArrowLink';
import SignWrapper from '../../_components/SignWrapper';

import { ResetPasswordFormContainer } from './components/ResetPasswordForm';

const ResetPassword = ({ location: { search } }) => (
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
);

ResetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
export default ResetPassword;
