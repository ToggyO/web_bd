import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';

import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { EditPhoneNumberFormContainer } from './components/EditPhoneNumberForm';

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
          <Link to={ROUTES.SETTINGS.ROOT} className="backtoprofile__link">
            <Icon type="arrow-left" className="backtoprofile__icon" /> Back to profile settings
          </Link>
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
