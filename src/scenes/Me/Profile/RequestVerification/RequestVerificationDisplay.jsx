import React from 'react';

import { RequestVerificationFormContainer } from './components/RequestVerificationForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';

import { ArrowLink } from '@components/ArrowLink';
import { ROUTES, APP_NAME } from '@config';

const RequestVerificationDisplay = () => (
  <HelmetWrapper
    title={`Request Verification - Profile Settings - ${APP_NAME}`}
    description="Request verification"
  >
    <div className="paper paper--white">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />
        <h2 className="change-setting__header">Request Verification</h2>

        <p>
          Upload a photo of yourself holding your official government ID such as passport or driver’s license.
          Make sure that you as well as the text and photo on your document are clearly visible. Your ID will
          never be shared with other traders and is required to ensure safety of your account and trades.
        </p>
        <RequestVerificationFormContainer />
      </div>
    </div>
  </HelmetWrapper>
);

export default RequestVerificationDisplay;
