import React from 'react';
import PropTypes from 'prop-types';

import { EditPhoneNumberFormContainer } from './components/EditPhoneNumberForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { ROUTES } from '@config/constants';

const EditPhoneNumberDisplay = ({
  history: {
    location: { state = {} },
  },
}) => {
  const { email } = state;

  return (
    <HelmetWrapper
      title="Change Phone - Profile Settings - Bitcoins Direct"
      description="Change phone number"
    >
      <div className="paper paper--white">
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
    </HelmetWrapper>
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
