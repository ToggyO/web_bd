import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import logo from '@assets/bd-logo.svg';
import miniLogo from '@assets/bd-mini-logo.svg';
import './style.less';

const { Header } = Layout;

const HeaderDisplay = ({ userName, logoutRequest, cleanState, collapsed, setCollapsed }) => {
  const handleLinkAction = (e, to) => {
    e.preventDefault();
    cleanState();
    history.push(to);
  };
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
              <a href="#">
                <img src={miniLogo} aria-label="logo" alt="Bitcoins direct" />
              </a>
            </div>
            <Icon
              className="bd-header__trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => setCollapsed(() => !collapsed)}
            />
          </>
        ) : (
          <>
            <a href="#" onClick={e => handleLinkAction(e, ROUTES.HOME)} className="large-logo">
              <img src={logo} aria-label="logo" alt="Bitcoins direct" />
            </a>
            <nav className="nav">
              <div className="nav__bubble" />
              {!window.matchMedia('(max-width: 813px)').matches && (
                <>
                  <a
                    href={ROUTES.ADS.BUY}
                    onClick={e => handleLinkAction(e, ROUTES.ADS.BUY)}
                    className="nav__link"
                  >
                    Buy bitcoins
                  </a>

                  <a
                    href={ROUTES.ADS.SELL}
                    onClick={e => handleLinkAction(e, ROUTES.ADS.SELL)}
                    className="nav__link"
                  >
                    Sell bitcoins
                  </a>

                  <a
                    href={ROUTES.ADS.CREATE}
                    onClick={e => handleLinkAction(e, ROUTES.ADS.CREATE)}
                    className="nav__link"
                  >
                    Create an ad
                  </a>

                  <Link to={ROUTES.OTHER.HELP} className="nav__link">
                    Help
                  </Link>
                </>
              )}
            </nav>
          </>
        )}

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
  userName: PropTypes.string,
  logoutRequest: PropTypes.func,
  cleanState: PropTypes.func,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};

export default HeaderDisplay;
