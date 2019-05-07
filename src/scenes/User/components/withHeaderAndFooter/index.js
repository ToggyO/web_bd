import React from 'react';
import { Header } from '../../../../components/Header';
import { Footer } from '../../../../components/Footer';

export default Component => {
  const withFooter = props => {
    return (
      <React.Fragment>
        <Header />
        <Component {...props} />
        <Footer />
      </React.Fragment>
    );
  };
  return withFooter;
};
