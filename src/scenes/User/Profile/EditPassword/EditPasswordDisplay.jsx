import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { AppWrapperContainer } from '@scenes/_components/AppWrapper';
import { EditPasswordFormContainer } from './components/EditPasswordForm';

const EditPhoneNumberDisplay = () => (
  <AppWrapperContainer>
    <div className="paper">
      <div className="change-setting">
        <Link to={ROUTES.PROFILE.SETTINGS} className="backtoprofile__link">
          <Icon type="arrow-left" className="backtoprofile__icon" /> Back to profile settings
        </Link>
        <h2 className="change-setting__header">Change Password</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ipsam quod! Blanditiis quo eius vero
          earum nemo perferendis laudantium corrupti cupiditate! Eum voluptas aperiam minima sequi voluptatibus harum,
          omnis corrupti.
        </p>
        <EditPasswordFormContainer />
      </div>
    </div>
  </AppWrapperContainer>
);

export default EditPhoneNumberDisplay;
