import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export const ButtonLink = ({ children }) => (
  <button className="button-link" type="button">
    {children}
  </button>
);

ButtonLink.propTypes = {
  children: PropTypes.string,
};
