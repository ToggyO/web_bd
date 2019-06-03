/* eslint-disable no-prototype-builtins */
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { checkTokens } from 'src/services/auth';
import { HeaderContainer } from './components/Header';

const AppWrapperDisplay = ({ userName, getUserProfileRequest, children }) => {
  useLayoutEffect(() => {
    if (checkTokens()) {
      getUserProfileRequest();
      // localStorage.setItem('userName', userName);
    }
  }, []);
  return (
    <>
      <HeaderContainer userName={userName} />
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
