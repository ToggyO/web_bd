import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './style.less';

export const Refresher = ({ loading, cb }) => {
  const [spin, setSpin] = useState(false);

  const goSpin = () => {
    setSpin(() => true);
    cb();
  };

  useEffect(() => {
    if (loading === false) {
      setSpin(() => false);
    }
  });

  return (
    <Icon
      style={{ transform: loading && 'scale(1.08)' }}
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
  loading: PropTypes.bool,
  cb: PropTypes.func,
};
