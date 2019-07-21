/* eslint-disable no-prototype-builtins */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkTokens } from '@services/auth';
import { Footer } from '@components/Footer';
import { HeaderContainer } from './components/Header';

const AppWrapperDisplay = ({ userName, getProfileRequest, children }) => {
  useEffect(() => {
    if (!userName && checkTokens()) getProfileRequest();
  }, []);

  return (
    <>
      <HeaderContainer />
      {children}
      <Footer />
    </>
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
