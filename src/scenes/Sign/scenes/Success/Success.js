import React from 'react';
import { PATH } from 'router-paths';
import AuthBox from '../../components/AuthBox';
import ToSignIn from '../../components/ToSignIn';
import withFooter from '../../components/withFooter';

const Success = () => (
  <AuthBox header="Congratulations">
    <p>You have successfully signed up.</p>
    <p>Please sign in to your account to proceed to the website.</p>
    <ToSignIn text="Go to Sign in" goTo={PATH.sign} />
  </AuthBox>
);

export default withFooter(Success);
