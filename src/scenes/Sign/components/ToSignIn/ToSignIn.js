import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

const ToSignIn = ({ text, leftArrow, direction }) => (
  <Link to={direction} className="tosignin__link">
    {leftArrow ? (
      <React.Fragment>
        <Icon type="arrow-left" className="tosignin__icon" /> {text}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {text} <Icon type="arrow-right" className="tosignin__icon" />
      </React.Fragment>
    )}
  </Link>
);

export default ToSignIn;

ToSignIn.propTypes = {
  text: PropTypes.string.isRequired,
  leftArrow: PropTypes.bool,
  direction: PropTypes.string.isRequired,
};
ToSignIn.defaultProps = {
  leftArrow: false,
};
