import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { AdFormContainer } from '../_components/AdForm';

import { ArrowLink } from '@components/ArrowLink';
import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES, APP_NAME } from '@config';
import './style.less';

const EditAdDisplay = ({ match, getAdByIdRequest, editAdRequest }) => {
  useEffect(() => {
    getAdByIdRequest(match.params.id);
  }, []);

  return (
    <HelmetWrapper title={`Edit your ad - ${APP_NAME}`} description="Edit your ad">
      <div className="paper paper--white">
        <div className="edit-ad">
          <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.ROOT} />

          <h2 className="edit-ad__header">Edit an ad #{match.params.id}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias ex, atque amet
            nihil neque fugiat expedita dolorem quam deserunt eligendi pariatur odit vitae tempore, tempora
            assumenda debitis ipsam, minima fugit. Sapiente perspiciatis, adipisci praesentium, debitis ipsa
            amet totam minus!
          </p>
          <AdFormContainer onSubmit={editAdRequest} type="ad" forEdit />
        </div>
        <p className="coindesk-powered">
          Powered by <a href="https://www.coindesk.com/price/bitcoin">Coindesk</a>
        </p>
      </div>
    </HelmetWrapper>
  );
};

EditAdDisplay.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  getAdByIdRequest: PropTypes.func,
  editAdRequest: PropTypes.func,
};

export default EditAdDisplay;
