import React from 'react';
import PropTypes from 'prop-types';
import ROUTES from 'src/routes';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import SignWrapper from '../../_components/SignWrapper';

import { ResetPasswordFormContainer } from './components/ResetPasswordForm';

const ResetPassword = ({ location: { search } }) => (
  <SignWrapper>
    <AuthBox header="Reset password">
      <p>
        Choose a new password for this user account. The password will replace the old one,
        everything else about the user account will remain unchanged.
      </p>
      <ResetPasswordFormContainer location={search} />
      <ToSignIn text="Back to Sign in" leftArrow goTo={ROUTES.HOME} />
    </AuthBox>
  </SignWrapper>
);

ResetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
export default ResetPassword;
