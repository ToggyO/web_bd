import React from 'react';
import PropTypes from 'prop-types';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { AdFormContainer } from '../_components/AdForm';
import './style.less';

const CreateAdDisplay = ({ isAuthorized, createAdRequest, persistFormState }) => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="create-ad">
        <h1>Create an ad</h1>
        <AdFormContainer onSubmit={isAuthorized ? createAdRequest : persistFormState} type="ad" />
      </div>
    </div>
  </AppWrapperContainer>
);

CreateAdDisplay.propTypes = {
  isAuthorized: PropTypes.bool,
  createAdRequest: PropTypes.func,
  persistFormState: PropTypes.func,
};

export default CreateAdDisplay;
