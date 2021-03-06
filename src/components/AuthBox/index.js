import React from 'react';
import PropTypes from 'prop-types';

import logo from '@assets/it-logo.svg';
import './style.less';

export const AuthBox = ({ header, children }) => (
  <div className="auth-box">
    <aside className="auth-box__aside">
      <div className="auth-box__bubble" />
      <img src={logo} aria-label="logo" alt="Ides Trading" />
    </aside>
    <main className="auth-box__main">
      <h1 className="auth-box__header">{header}</h1>
      {children}
    </main>
  </div>
);

AuthBox.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
