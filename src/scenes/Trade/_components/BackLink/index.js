/* eslint-disable react/prop-types */
import React from 'react';

import { ArrowLink } from '@components/ArrowLink';

import { ROUTES } from '@config';

export const BackLink = ({ tradeStatus }) => {
  switch (tradeStatus) {
    case 'New':
      return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.REQUESTS} />;
    case 'Depositing':
    case 'InProgress':
    case 'FiatSent':
    case 'Disputed':
      return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.ACTIVE} />;
    case 'Completed':
    case 'ResolvedToBuyer':
    case 'ResolvedToSeller':
      return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.COMPLETED} />;
    default:
      return <ArrowLink text="Back to dashboard" leftArrow goTo={ROUTES.DASHBOARD.ROOT} />;
  }
};
