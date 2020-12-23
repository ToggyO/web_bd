import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@config';
import './style.less';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__links">
      <Link to={ROUTES.OTHER.PRIVACY} className="footer__link">
        Privacy
      </Link>
      <Link to={ROUTES.OTHER.TERMS} className="footer__link">
        Terms
      </Link>
    </div>
    <span className="footer__copyright">Copyright © 2019 All Rights Reserved.</span>
  </footer>
);
