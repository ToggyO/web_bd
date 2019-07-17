/* eslint-disable react/prop-types */
import React from 'react';
import './style.less';
import { Icon } from 'antd';

export const ExclamationMessage = ({ children }) => (
  <p className="exclamation__note">
    <Icon type="exclamation-circle" theme="filled" className="exclamation__icon" />
    <span>{children}</span>
  </p>
);
