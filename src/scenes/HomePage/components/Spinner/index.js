import React from 'react';
import { Icon, Spin } from 'antd';
const SpinIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

export const Spinner = () => (
  <div
    style={{
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      top: '47%',
      transform: 'translateX(-50%)',
    }}
  >
    <Spin indicator={SpinIcon} />
  </div>
);
