/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { checkTokens } from '@services/auth';
import { Footer } from '@components/Footer';
import { DrawerDisplay } from './components/Drawer';
import { HeaderContainer } from './components/Header';

const { Content } = Layout;

const AppWrapperDisplay = ({ userID, userName, countryCode, getProfileRequest, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if ((!userID || !userName || !countryCode) && checkTokens()) getProfileRequest();
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
  userID: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  countryCode: PropTypes.string,
  getProfileRequest: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default AppWrapperDisplay;
