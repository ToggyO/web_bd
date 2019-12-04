import React from 'react';
import PropTypes from 'prop-types';

import { EditPhoneNumberFormContainer } from './components/EditPhoneNumberForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ArrowLink } from '@components/ArrowLink';
import { ROUTES } from '@config';

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
            </>
          ) : (
            <>
              <p>
                Please use the form below to change your phone number. Kindly note that to bind your new phone
                number to your user profile, we will send you an email to the address you have connected with
                your Bitcoins Direct account.
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
