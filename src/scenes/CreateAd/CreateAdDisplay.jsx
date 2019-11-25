import React from 'react';
import PropTypes from 'prop-types';

import { AdFormContainer } from '../_components/AdForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import './style.less';

const CreateAdDisplay = ({ user: { id }, createAdRequest, persistFormState }) => {
  const isAuthorized = !!id;

  return (
    <HelmetWrapper title="Create an ad - Bitcoins Direct" description="Create an ad">
      <div className="paper paper--white">
        <div className="create-ad">
          <h1>Create an ad</h1>
          <AdFormContainer onSubmit={isAuthorized ? createAdRequest : persistFormState} type="ad" />
        </div>
        <p className="coindesk-powered">
          Powered by <a href="https://www.coindesk.com/price/bitcoin">Coindesk</a>
        </p>
      </div>
    </HelmetWrapper>
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
