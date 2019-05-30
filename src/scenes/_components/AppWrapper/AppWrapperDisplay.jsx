import React from 'react';
import PropTypes from 'prop-types';
import { HeaderDisplay } from './components/Header';

const AppWrapperDisplay = ({ children }) => (
  <>
    <HeaderDisplay />
    {children}
  </>
);

AppWrapperDisplay.propTypes = {
  children: PropTypes.element,
};
export default AppWrapperDisplay;
