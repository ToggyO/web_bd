import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Dropdown, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import logo from '@assets/logo.svg';
import miniLogo from '@assets/mini-logo.svg';
import './style.less';

const HeaderDisplay = ({ userName, logoutRequest, cleanState }) => {
  const handleLinkAction = (e, to) => {
    e.preventDefault();
    cleanState();
    history.push(to);
  };
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
        <a href="#" onClick={e => handleLinkAction(e, ROUTES.HOME)} className="header__logo">
          <img
            src={window.matchMedia('(max-width: 500px)').matches ? miniLogo : logo}
            aria-label="logo"
            alt="Bitcoins direct"
          />
        </a>

        <a
          href={ROUTES.TRADES.BUY}
          onClick={e => handleLinkAction(e, ROUTES.TRADES.BUY)}
          className="nav__link"
        >
          Buy <span>bitcoins</span>
        </a>

        <a
          href={ROUTES.TRADES.SELL}
          onClick={e => handleLinkAction(e, ROUTES.TRADES.SELL)}
          className="nav__link"
        >
          Sell <span>bitcoins</span>
        </a>

        <a
          href={ROUTES.TRADES.CREATE}
          onClick={e => handleLinkAction(e, ROUTES.TRADES.CREATE)}
          className="nav__link"
        >
          Post <span>a trade</span>
        </a>

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
                <>
                  <span>
                    <Icon type="user-add" /> Sign up for free
                  </span>
                </>
              </Link>
              <Link to={{ pathname: ROUTES.LOGIN, state: { toSignIn: true } }} className="nav__link">
                <>
                  <Icon type="lock" /> <span>Sign in</span>
                </>
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
  cleanState: PropTypes.func,
};

export default HeaderDisplay;
