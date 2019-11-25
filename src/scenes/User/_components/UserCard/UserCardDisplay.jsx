/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Avatar, Divider, Spin } from 'antd';
import { Helmet } from 'react-helmet';

import history from '@services/history';
import { catchFromPath } from '@utils';
import './style.less';

const UserCardDisplay = ({ profile, loading }) => {
  const userName = catchFromPath(history.location.pathname, 'users');
  const { registrationDate, processingDate, availabilityStatus = true } = profile;

  return (
    <>
      <Helmet defaultTitle={`${userName}'s Profile - Bitcoins Direct`}>
        <meta name="description" content="User's Profile" />
      </Helmet>
      <div className="user-card">
        <div className="user-card__avatar">
          <Avatar
            size={74}
            icon="user"
            style={{ backgroundColor: '#000000', marginBottom: 14, zIndex: 100 }}
          />
          {loading && <div className="avatar-spinner" />}
          <h2>{userName}</h2>
        </div>
        <Divider />
        <Spin spinning={false} indicator={<div />}>
          <div className="user-card__meta">
            <div className="user-card__prop">
              <span>Registration date</span>

              <p>{moment(registrationDate).format('MM.DD.YY')}</p>
            </div>
            <div className="user-card__prop">
              <span>Verification date</span>

              <p>{processingDate ? moment(processingDate).format('MM.DD.YY') : '-'}</p>
            </div>
            <div />
            <div className="user-card__prop">
              <span>Status</span>
              <p>{availabilityStatus ? 'Active' : 'Blocked'}</p>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};
UserCardDisplay.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    registrationDate: PropTypes.string,
    processingDate: PropTypes.string,
    availabilityStatus: PropTypes.bool,
  }),
  loading: PropTypes.bool,
};

UserCardDisplay.defaultProps = {
  profile: {
    availabilityStatus: true,
  },
};

export default UserCardDisplay;
