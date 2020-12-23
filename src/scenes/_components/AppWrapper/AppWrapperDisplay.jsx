/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect, memo } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import { MyDrawer } from './components/MyDrawer';

import { HeaderContainer } from './components/Header';

import { checkTokens } from '@services/auth';
import { Footer } from '@components/Footer';

const { Content } = Layout;

const AppWrapperDisplay = memo(({ user, countryCode, getProfileRequest, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if ((!user || !countryCode) && checkTokens()) getProfileRequest();
  }, []);

  return (
    <Layout>
      <MyDrawer collapsed={collapsed} setCollapsed={setCollapsed} />
      <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
});

AppWrapperDisplay.propTypes = {
  user: PropTypes.object,
  countryCode: PropTypes.string,
  getProfileRequest: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default AppWrapperDisplay;
