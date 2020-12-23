import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

export const ArrowLink = ({ text, leftArrow, goTo }) => (
  <Link to={goTo} className="arrow-link">
    {leftArrow ? (
      <>
        <Icon type="arrow-left" className="arrow-icon" /> {text}
      </>
    ) : (
      <>
        {text} <Icon type="arrow-right" className="arrow-icon" />
      </>
    )}
  </Link>
);

ArrowLink.propTypes = {
  text: PropTypes.string.isRequired,
  leftArrow: PropTypes.bool,
  goTo: PropTypes.string.isRequired,
};
ArrowLink.defaultProps = {
  leftArrow: false,
};
