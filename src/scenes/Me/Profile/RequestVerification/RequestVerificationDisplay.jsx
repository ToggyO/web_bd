import React from 'react';

import { RequestVerificationFormContainer } from './components/RequestVerificationForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';

import { ArrowLink } from '@components/ArrowLink';
import { ROUTES } from '@config/constants';

const RequestVerificationDisplay = () => (
  <HelmetWrapper
    title="Request Verification - Profile Settings - Bitcoins Direct"
    description="Request verification"
  >
    <div className="paper paper--white">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />
        <h2 className="change-setting__header">Request Verification</h2>

        <p>
          Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris interesset. Eum te odio
          zril facilisi, quo singulis torquatos in, sea in duis bonorum adipisci. Elit iudico iuvaret vis te.
          Eligendi scripserit duo ne, has eros veniam epicurei eu, quidam mentitum adipisci eos ne.
        </p>
        <RequestVerificationFormContainer />
      </div>
    </div>
  </HelmetWrapper>
);

export default RequestVerificationDisplay;
