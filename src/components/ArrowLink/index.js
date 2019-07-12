import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.less';

const ArrowLink = ({ text, leftArrow, goTo }) => (
  <Link to={goTo} className="arrow-link">
    {leftArrow ? (
      <React.Fragment>
        <Icon type="arrow-left" className="arrow-icon" /> {text}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {text} <Icon type="arrow-right" className="arrow-icon" />
      </React.Fragment>
    )}
  </Link>
);

export default ArrowLink;

ArrowLink.propTypes = {
  text: PropTypes.string.isRequired,
  leftArrow: PropTypes.bool,
  goTo: PropTypes.string.isRequired,
};
ArrowLink.defaultProps = {
  leftArrow: false,
};
