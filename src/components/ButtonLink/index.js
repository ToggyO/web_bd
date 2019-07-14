/* eslint-disable react/prop-types */
import React from 'react';
import './style.less';

export const ButtonLink = props => (
  <button className="button-link" type="button" {...props}>
    {props.children}
  </button>
);
