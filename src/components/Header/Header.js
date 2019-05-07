import React from 'react';
import { Icon, Menu, Dropdown, Button, Avatar } from 'antd';

import './style.less';

const menu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="#">
        <Icon type="user" /> Profile settings
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="#">
        <Icon type="user" /> Dashboard
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="#">
        <Icon type="logout" /> Logout
      </a>
    </Menu.Item>
  </Menu>
);

const Header = () => (
  <header className="header">
    <div className="header__bubble" />
    <nav className="container nav">
      <h1 className="header__logo">Bitcoins Direct</h1>
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
        <a href="#" className="nav__link right-nav__link">
          <Icon type="search" />
        </a>
        <a href="#" className="nav__link right-nav__link">
          <Icon type="bell" />
        </a>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Button className="user-button">
            <Avatar size="small" icon="user" className="user-avatar" />
            John Riley
          </Button>
        </Dropdown>
      </div>
    </nav>
  </header>
);

export default Header;
