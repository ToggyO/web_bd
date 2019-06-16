import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import{ ROUTES }from '@config/constants';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { EditTradeForm } from './components/EditTradeForm';
import './style.less';

const EditTrade = ({ match }) => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="edit-trade">
        <Link to={ROUTES.USER_DASHBOARD} className="back-to-dashboard__link">
          <Icon type="arrow-left" className="backtoprofile__icon" /> Back to dashboard
        </Link>
        <h2 className="edit-trade__header">Edit the post trade #{match.params.id}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur molestias ex, atque
          amet nihil neque fugiat expedita dolorem quam deserunt eligendi pariatur odit vitae
          tempore, tempora assumenda debitis ipsam, minima fugit. Sapiente perspiciatis, adipisci
          praesentium, debitis ipsa amet totam minus!
        </p>
        <EditTradeForm />
      </div>
    </div>
  </AppWrapperContainer>
);

EditTrade.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default EditTrade;
