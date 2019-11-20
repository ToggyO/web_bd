import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, Menu } from 'antd';

import { ROUTES } from '@config/constants';
import history from '@services/history';
import logo from '@assets/bd-logo.svg';
import './style.less';

const DrawerDisplay = ({ collapsed, setCollapsed, cleanState }) => {
  const handleLinkAction = (e, to) => {
    e.preventDefault();
    cleanState();
    setCollapsed(true);
    history.push(to);
  };

  return (
    <Drawer
      className="bd-drawer"
      visible={!collapsed}
      closable={false}
      placement="left"
      onClose={() => setCollapsed(true)}
      title={
        <div className="logo">
          <a onClick={e => handleLinkAction(e, ROUTES.HOME)}>
            <img src={logo} aria-label="logo" alt="Bitcoins direct" />
          </a>
        </div>
      }
    >
      <Menu mode="inline">
        <Menu.Item key="1">
          <Link onClick={() => setCollapsed(true)} to={ROUTES.ADS.BUY}>
            Buy bitcoins
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link onClick={() => setCollapsed(true)} to={ROUTES.ADS.SELL}>
            Sell bitcoins
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link onClick={() => setCollapsed(true)} to={ROUTES.ADS.CREATE}>
            Create an ad
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <a
            onClick={() => setCollapsed(true)}
            href="https://bitcoinsdirect.freshdesk.com/support/home"
            target="_blank"
          >
            Help
          </a>
        </Menu.Item>
        <Menu.Item key="5">
          <Link onClick={() => setCollapsed(true)} to={ROUTES.OTHER.PRIVACY}>
            Privacy
          </Link>
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

DrawerDisplay.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
  cleanState: PropTypes.func,
};
export default DrawerDisplay;
