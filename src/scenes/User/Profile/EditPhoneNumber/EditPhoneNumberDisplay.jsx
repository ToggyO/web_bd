import React from 'react';
import PropTypes from 'prop-types';

import { EditPhoneNumberFormContainer } from './components/EditPhoneNumberForm';

import { ArrowLink } from '@components/ArrowLink';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';

import { ROUTES } from '@config/constants';

const EditPhoneNumberDisplay = ({
  history: {
    location: { state = {} },
  },
}) => {
  const { email } = state;

  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="change-setting">
          <ArrowLink text="Back to profile settings" leftArrow goTo={ROUTES.SETTINGS.ROOT} />

          <h2 className="change-setting__header">Change Phone Number</h2>
          {email ? (
            <>
              <p>
                Please check your email <span className="primary-color">{email}</span> to proceed with the
                website.
              </p>
              <p>
                Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris interesset. Eum te
                odio zril facilisi, quo singulis torquatos in, sea in duis bonorum adipisci. Elit iudico
                iuvaret vis te. Eligendi scripserit duo ne, has eros veniam epicurei eu, quidam mentitum
                adipisci eos ne.
              </p>
            </>
          ) : (
            <>
              <p>
                Lorem ipsum dolor sit amet, suas omnis oportere mei no, cum in diam viris interesset. Eum te
                odio zril facilisi, quo singulis torquatos in, sea in duis bonorum adipisci. Elit iudico
                iuvaret vis te. Eligendi scripserit duo ne, has eros veniam epicurei eu, quidam mentitum
                adipisci eos ne.
              </p>
              <EditPhoneNumberFormContainer />
            </>
          )}
        </div>
      </div>
    </AppWrapperContainer>
  );
};

EditPhoneNumberDisplay.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        email: PropTypes.string,
      }),
    }),
  }),
};

export default EditPhoneNumberDisplay;
