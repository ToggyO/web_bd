import React from 'react';

import { EditFullNameFormContainer } from './components/EditFullNameForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { ROUTES, APP_NAME } from '@config';

const EditFullName = () => (
  <HelmetWrapper title={`Change Name - Profile Settings - ${APP_NAME}`} description="Change name">
    <div className="paper paper--white">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />

        <h2 className="change-setting__header">Edit real name</h2>
        <p>
          If you are applying for an identity check on {APP_NAME} and your current name doesn’t match the
          one that appears on your lawful presence document(s), you must change the Real Name specified on our
          platform prior to applying for Verification.
        </p>
        <EditFullNameFormContainer />
      </div>
    </div>
  </HelmetWrapper>
);

export default EditFullName;
