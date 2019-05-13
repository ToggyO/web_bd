import React from 'react';
import './style.less';
import { Footer } from '../../../../components/Footer';

export default Component => {
  const withFooter = props => (
    <div className="with-footer">
      <Component {...props} />
      <Footer />
    </div>
  );

  return withFooter;
};
