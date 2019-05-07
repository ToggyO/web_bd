import React from 'react';
import { Icon } from 'antd';
import './style.less';

const BackToProfileLink = ({ togglePage }) => (
  <a href="" className="backtoprofile__link" onClick={togglePage}>
    <Icon type="arrow-left" className="backtoprofile__icon" /> Back to profile settings
  </a>
);

export default BackToProfileLink;
