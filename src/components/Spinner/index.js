import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin } from 'antd';
import './style.less';

export const Spinner = ({ children, global, fontSize, margin, spinning }) => {
  const SpinIcon = <Icon type="loading" style={{ fontSize, margin }} spin />;
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
      <Spin indicator={SpinIcon} spinning={spinning}>
        {children}
      </Spin>
    </div>
  );
};

Spinner.propTypes = {
  global: PropTypes.bool,
  fontSize: PropTypes.number,
  margin: PropTypes.string,
};

Spinner.defaultProps = {
  global: false,
  fontSize: 15,
  margin: '0 0 0 0',
};
