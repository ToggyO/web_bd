/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';

export const HelmetWrapper = ({ title = '', description = '', children }) => (
  <>
    <Helmet defaultTitle={title}>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </>
);
