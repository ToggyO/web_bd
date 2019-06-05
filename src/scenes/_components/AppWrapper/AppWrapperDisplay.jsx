/* eslint-disable no-prototype-builtins */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkTokens } from 'src/services/auth';
import { HeaderContainer } from './components/Header';

const AppWrapperDisplay = ({ userName, getUserProfileRequest, children }) => {
  useEffect(() => {
    if (checkTokens() && userName !== localStorage.getItem('userName')) {
      getUserProfileRequest();
    }
  }, []);

  return (
    <>
      <HeaderContainer />
      {children}
    </>
  );
};

AppWrapperDisplay.propTypes = {
  userName: PropTypes.string,
  getUserProfileRequest: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default AppWrapperDisplay;
