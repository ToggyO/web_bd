import React from 'react';

import { EditPasswordFormContainer } from './components/EditPasswordForm';

import { ArrowLink } from '@components/ArrowLink';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES } from '@config';

const EditPhoneNumberDisplay = () => (
  <HelmetWrapper title="Change Password - Profile Settings - Bitcoins Direct" description="Change password">
    <div className="paper paper--white">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />
        <h2 className="change-setting__header">Change Password</h2>

        <p>You can enter a new password to access a system.</p>
        <EditPasswordFormContainer />
      </div>
    </div>
  </HelmetWrapper>
);

export default EditPhoneNumberDisplay;
