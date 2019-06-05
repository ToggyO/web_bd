import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';
import './style.less';

export const Spinner = ({ global, fontSize }) => {
  const SpinIcon = <Icon type="loading" style={{ fontSize }} spin />;
  return (
    <div
      style={
        global
          ? {
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            top: '290px',
            transform: 'translateX(-50%)',
          }
          : null
      }
    >
      <Spin indicator={SpinIcon} />
    </div>
  );
};

Spinner.propTypes = {
  global: PropTypes.bool,
  fontSize: PropTypes.number,
};

Spinner.defaultProps = {
  global: false,
  fontSize: 15,
};
