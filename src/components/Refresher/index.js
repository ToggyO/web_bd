import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './style.less';

export const Refresher = ({ style, loading, cb }) => {
  const [spin, setSpin] = useState(false);
  const goSpin = () => {
    setSpin(true);
    cb();
  };

  useEffect(() => {
    if (loading === false) {
      setSpin(() => false);
    }
  }, [loading]);

  return (
    <Icon
      style={{ ...style, transform: loading && 'scale(1.08)' }}
      type="sync"
      spin={spin}
      className="refresher"
      onClick={() => {
        goSpin(cb);
      }}
    />
  );
};

Refresher.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  cb: PropTypes.func,
};
