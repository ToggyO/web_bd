import React from 'react';
import PropTypes from 'prop-types';

import { AdFormContainer } from '../_components/AdForm';

import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import './style.less';

const CreateAdDisplay = ({ user: { id }, createAdRequest, persistFormState }) => {
  const isAuthorized = !!id;
  return (
    <AppWrapperContainer>
      <div className="paper">
        <div className="create-ad">
          <h1>Create an ad</h1>
          <AdFormContainer onSubmit={isAuthorized ? createAdRequest : persistFormState} type="ad" />
        </div>
        <p className="coindesk-powered">
          Powered by <a href="https://www.coindesk.com/price/bitcoin">Coindesk</a>
        </p>
      </div>
    </AppWrapperContainer>
  );
};

CreateAdDisplay.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  createAdRequest: PropTypes.func,
  persistFormState: PropTypes.func,
};

export default CreateAdDisplay;
