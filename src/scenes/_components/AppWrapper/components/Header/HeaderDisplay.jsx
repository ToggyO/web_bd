import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTES } from '@config';
import logo from '@assets/it-logo.svg';
import miniLogo from '@assets/bd-mini-logo.svg';
import './style.less';

const { Header } = Layout;

const HeaderDisplay = ({ user, logoutRequest, collapsed, setCollapsed }) => {
  const { userName } = user;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link rel="noopener noreferrer" to={ROUTES.SETTINGS.ROOT}>
          <Icon type="user" /> Profile settings
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link rel="noopener noreferrer" to={ROUTES.DASHBOARD.ROOT}>
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
    <Header className="bd-header">
      <div className="bd-header__container">
        {window.matchMedia('(max-width: 813px)').matches ? (
          <>
            <div className="logo">
              <Link to={ROUTES.HOME}>
                <img src={miniLogo} aria-label="logo" alt="Ides Trading" />
              </Link>
            </div>
            <Icon
              className="bd-header__trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => setCollapsed(() => !collapsed)}
            />
          </>
        ) : (
          <>
            <Link to={ROUTES.HOME} className="large-logo">
              <img src={logo} aria-label="logo" alt="Ides Trading" />
            </Link>

            <nav className="nav">
              <div className="nav__bubble" />
              {!window.matchMedia('(max-width: 813px)').matches && (
                <>
                  <Link to={ROUTES.ADS.BUY} className="nav__link">
                    Buy bitcoins
                  </Link>

                  <Link to={ROUTES.ADS.SELL} className="nav__link">
                    Sell bitcoins
                  </Link>

                  <Link to={ROUTES.ADS.CREATE} className="nav__link">
                    Create an ad
                  </Link>

                  <a
                    className="nav__link"
                    href="https://bitcoinsdirect.freshdesk.com/support/home"
                    target="_blank"
                  >
                    Help
                  </a>
                </>
              )}
            </nav>
          </>
        )}

        <div className="right-nav">
          {userName ? (
            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
              <Button className="user-button">
                <Avatar size="small" icon="user" className="user-avatar" />
                <span className="user-name">{userName}</span>
              </Button>
            </Dropdown>
          ) : (
            <>
              <Link to={{ pathname: ROUTES.LOGIN, state: { toSignUp: true } }} className="nav__link">
                <>
                  <Icon type="user-add" /> Sign up <span className="hideble-span">for free</span>
                </>
              </Link>
              <Link to={{ pathname: ROUTES.LOGIN, state: { toSignIn: true } }} className="nav__link">
                <>
                  <Icon type="lock" /> Sign in
                </>
              </Link>
            </>
          )}
        </div>
      </div>
    </Header>
  );
};

HeaderDisplay.propTypes = {
  user: PropTypes.object,
  logoutRequest: PropTypes.func,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};

export default HeaderDisplay;
