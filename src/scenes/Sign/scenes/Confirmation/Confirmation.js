import React from 'react';
import { PATH } from 'router-paths';
import AuthBox from '../../components/AuthBox';
import ToSignIn from '../../components/ToSignIn';
import withFooter from '../../components/withFooter';

const Confirmation = () => (
  <AuthBox header="Account Created">
    <p>Please confirm your email riley419@gmail.com to proceed with the website.</p>
    <ToSignIn text="Back to Sign in" leftArrow goTo={PATH.sign} />
  </AuthBox>
);

export default withFooter(Confirmation);
