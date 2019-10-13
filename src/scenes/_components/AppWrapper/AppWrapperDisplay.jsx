/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import { DrawerDisplay } from './components/Drawer';

import { HeaderContainer } from './components/Header';

import { checkTokens } from '@services/auth';
import { Footer } from '@components/Footer';

const { Content } = Layout;

const AppWrapperDisplay = ({ user, countryCode, getProfileRequest, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if ((!user || !countryCode) && checkTokens()) getProfileRequest();
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
  user: PropTypes.object,
  countryCode: PropTypes.string,
  getProfileRequest: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default AppWrapperDisplay;
