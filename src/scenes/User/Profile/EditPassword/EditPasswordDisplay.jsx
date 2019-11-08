import React from 'react';

import { EditPasswordFormContainer } from './components/EditPasswordForm';

import { ArrowLink } from '@components/ArrowLink';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';

import { ROUTES } from '@config/constants';

const EditPhoneNumberDisplay = () => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />
        <h2 className="change-setting__header">Change Password</h2>

        <p>You can enter a new password to access a system.</p>
        <EditPasswordFormContainer />
      </div>
    </div>
  </AppWrapperContainer>
);

export default EditPhoneNumberDisplay;
