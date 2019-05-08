import React from 'react';
import { Header } from '../../../../components/Header';
import { Footer } from '../../../../components/Footer';

export default Component => {
  const withMarkup = props => {
    return (
      <React.Fragment>
        <Header />
        <div className="paper">
          <Component {...props} />
        </div>
        <Footer />
      </React.Fragment>
    );
  };
  return withMarkup;
};
