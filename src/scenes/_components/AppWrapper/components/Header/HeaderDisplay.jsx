import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Dropdown, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import logo from '@assets/logo.svg';
import './style.less';

const HeaderDisplay = ({ logoutRequest, userName }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link rel="noopener noreferrer" to={ROUTES.PROFILE.SETTINGS}>
          <Icon type="user" /> Profile settings
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link rel="noopener noreferrer" to={ROUTES.USER_DASHBOARD}>
          <Icon type="dashboard" /> Dashboard
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={logoutRequest}>
          <Icon type="logout" /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <nav className="container nav">
        <div className="nav__bubble" />
        <Link to="/" className="header__logo">
          <img src={logo} aria-label="logo" alt="Bitcoins direct" />
        </Link>

        <Link to={ROUTES.TRADES.BUY_TRADES} className="nav__link">
          Buy bitcoins
        </Link>
        <Link to={ROUTES.TRADES.SELL_TRADES} className="nav__link">
          Sell bitcoins
        </Link>
        <Link to={ROUTES.TRADES.CREATE} className="nav__link">
          Post a trade
        </Link>
        <a className="nav__link">Help</a>

        <div className="right-nav">
          {userName ? (
            <>
              <a href="#" className="nav__link right-nav__bell">
                <Icon type="bell" />
              </a>
              <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <Button className="user-button">
                  <Avatar size="small" icon="user" className="user-avatar" />
                  <span className="user-name">{userName}</span>
                </Button>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to={{ pathname: ROUTES.LOGIN, state: { toSignUp: true } }} className="nav__link">
                <Icon type="user-add" /> Sign up for free
              </Link>
              <Link to={{ pathname: ROUTES.LOGIN, state: { toSignIn: true } }} className="nav__link">
                <Icon type="lock" /> Sign in
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

HeaderDisplay.propTypes = {
  userName: PropTypes.string,
  logoutRequest: PropTypes.func,
};

export default HeaderDisplay;
