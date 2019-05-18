import React from 'react';
import PropTypes from 'prop-types';
import logo from 'assets/logo.svg';
import './style.less';

const AuthBox = ({ header, children }) => (
  <div className="auth-box">
    <aside className="auth-box__aside">
      <div className="auth-box__bubble" />
      <div className="auth-box__logo">
        <img src={logo} aria-label="logo" alt="Bitcoins direct" />
        <span>Bitcoins Direct</span>
      </div>
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

export default AuthBox;
