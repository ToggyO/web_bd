import React from 'react';

import { EditEmailFormContainer } from './components/EditEmailForm';

import { ArrowLink } from '@components/ArrowLink';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';

import { ROUTES } from '@config/constants';

const EditEmailDisplay = () => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="change-setting">
        <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />

        <h2 className="change-setting__header">Change email</h2>
        <p>
          Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris interesset. Eum te odio
          zril facilisi, quo singulis torquatos in, sea in duis bonorum adipisci. Elit iudico iuvaret vis te.
          Eligendi scripserit duo ne, has eros veniam epicurei eu, quidam mentitum adipisci eos ne.
        </p>
        <EditEmailFormContainer />
      </div>
    </div>
  </AppWrapperContainer>
);

export default EditEmailDisplay;
