/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@config';

export const TradeHeader = ({ id, action, user }) => (
  <h1 className="trade__header">
    #{id} {action}
    <Link to={`${ROUTES.USERS.ROOT}/${user}`}>{user}</Link>
  </h1>
);
