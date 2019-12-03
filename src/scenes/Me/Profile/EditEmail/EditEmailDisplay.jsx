import React from 'react';

import { EditEmailFormContainer } from './components/EditEmailForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { ROUTES } from '@config/constants';

const EditEmailDisplay = () => (
  <HelmetWrapper title="Change Email - Profile Settings - Bitcoins Direct" description="Change email">
    <div className="paper paper--white">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />

        <h2 className="change-setting__header">Change email</h2>
        <p>
          Please use the form below to change your email. Kindly note that to bind your new email to your user
          profile, we will send you a text message to the phone number you have connected with your Bitcoins
          Direct account.
        </p>
        <EditEmailFormContainer />
      </div>
    </div>
  </HelmetWrapper>
);

export default EditEmailDisplay;
