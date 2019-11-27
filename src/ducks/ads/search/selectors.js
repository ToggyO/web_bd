import { createSelector } from 'reselect';

import { purifyObject, makeQueryStringFromObject } from '@utils';

const searchSelector = state => state.ads.search;

export const searchQueryStringSelector = createSelector([searchSelector], search =>
  makeQueryStringFromObject(purifyObject(search)),
);

export const amountSelector = createSelector([searchSelector], search => search.amount);

export const paymentSelector = createSelector([searchSelector], search => search.payment);

export const locationSelector = createSelector([searchSelector], search => search.location);

export const currencySelector = createSelector([searchSelector], search => search.currency);

export const fieldSelector = createSelector([searchSelector], search => search.field);

export const orderSelector = createSelector([searchSelector], search => search.order);

export const pageSelector = createSelector([searchSelector], search => +search.page);
