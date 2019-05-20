import React from 'react';
import PropTypes from 'prop-types';
import { PATH } from 'paths';
import AuthBox from 'src/components/AuthBox';
import ToSignIn from 'src/components/ToSignIn';
import withFooter from 'src/components/withFooter';
import { ResetPasswordFormContainer } from './components/ResetPasswordForm';

const ResetPassword = ({ location: { search } }) => (
  <AuthBox header="Reset password">
    <p>
      Choose a new password for this user account. The password will replace the old one,
      everything else about the user account will remain unchanged.
    </p>
    <ResetPasswordFormContainer location={search} />
    <ToSignIn text="Back to Sign in" leftArrow goTo={PATH.HOME} />
  </AuthBox>
);

ResetPassword.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
export default withFooter(ResetPassword);
