import React from 'react';
import { Icon, Menu, Dropdown, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import ROUTES from 'src/routes';
import logo from 'src/assets/logo.svg';

import './style.less';

const menu = (
  <Menu>
    <Menu.Item>
      <Link rel="noopener noreferrer" to={ROUTES.USER_SETTINGS}>
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
      <Link rel="noopener noreferrer" to={ROUTES.LOGIN}>
        <Icon type="logout" /> Logout
      </Link>
    </Menu.Item>
  </Menu>
);

const Header = () => (
  <header className="header">
    <nav className="container nav">
      <div className="nav__bubble" />
      <Link to="/" className="header__logo">
        <img src={logo} aria-label="logo" alt="Bitcoins direct" />
      </Link>

      <a href="#" className="nav__link">
        Buy bitcoins
      </a>
      <a href="#" className="nav__link">
        Sell bitcoins
      </a>
      <a href="#" className="nav__link">
        Post a trade
      </a>
      <a href="#" className="nav__link">
        Help
      </a>

      <div className="right-nav">
        <Link to={{ pathname: ROUTES.LOGIN, state: { toSignUp: true } }}>Sign up for free</Link>
        <Link to={{ pathname: ROUTES.LOGIN, state: { toSignIn: true } }}>Sign in</Link>
        {/* <a href="#" className="nav__link right-nav__link">
          <Icon type="bell" />
        </a>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Button className="user-button">
            <Avatar size="small" icon="user" className="user-avatar" />
            <span className="user-name">John Riley</span>
          </Button>
        </Dropdown> */}
      </div>
    </nav>
  </header>
);

export default Header;
