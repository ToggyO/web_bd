import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export const ButtonLink = props => (
  <button className="button-link" type="button" {...props}>
    {props.children}
  </button>
);

ButtonLink.propTypes = {
  children: PropTypes.string,
};
