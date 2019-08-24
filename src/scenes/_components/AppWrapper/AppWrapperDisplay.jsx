/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { checkTokens } from '@services/auth';
import { Footer } from '@components/Footer';
import { DrawerDisplay } from './components/Drawer';
import { HeaderContainer } from './components/Header';

const { Content } = Layout;

const AppWrapperDisplay = ({ userName, getProfileRequest, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (!userName && checkTokens()) getProfileRequest();
  }, []);

  return (
    <Layout>
      <DrawerDisplay collapsed={collapsed} setCollapsed={setCollapsed} />
      <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

AppWrapperDisplay.propTypes = {
  userName: PropTypes.string,
  getProfileRequest: PropTypes.func,
  children: PropTypes.element.isRequired,
};

AppWrapperDisplay.defaultProps = {
  userName: null,
};

export default AppWrapperDisplay;
