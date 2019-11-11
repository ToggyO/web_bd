import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import { AdFormContainer } from '../_components/AdForm';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import { ROUTES } from '@config/constants';
import { prettifyId } from '@utils/';
import './style.less';

const EditAdDisplay = ({ match, getAdByIdRequest, editAdRequest }) => {
  useEffect(() => {
    getAdByIdRequest(match.params.id);
  }, []);

  return (
    <HelmetWrapper title="Edit your ad - Bitcoins Direct" description="Edit your ad">
      <div className="paper">
        <div className="edit-ad">
          <Link to={ROUTES.DASHBOARD.ROOT} className="back-to-dashboard__link">
            <Icon type="arrow-left" className="backtoprofile__icon" /> Back to dashboard
          </Link>
          <h2 className="edit-ad__header">Edit an ad #{prettifyId(match.params.id)}</h2>
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
