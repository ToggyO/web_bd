import { createSelector } from 'reselect';
import { purifyObject, makeQueryStringFromObject } from '@utils';

const searchParamsSelector = state => state.trades.searchParams;

export const searchQueryStringSelector = createSelector(
  [searchParamsSelector],
  searchParams => makeQueryStringFromObject(purifyObject(searchParams))
);

export const amountSelector = createSelector(
  [searchParamsSelector],
  searchParams => searchParams.amount
);

export const paymentSelector = createSelector(
  [searchParamsSelector],
  searchParams => searchParams.payment
);

export const locationSelector = createSelector(
  [searchParamsSelector],
  searchParams => searchParams.location
);

export const currencySelector = createSelector(
  [searchParamsSelector],
  searchParams => searchParams.currency
);

export const fieldSelector = createSelector(
  [searchParamsSelector],
  searchParams => searchParams.field
);

export const orderSelector = createSelector(
  [searchParamsSelector],
  searchParams => searchParams.order
);

export const pageSelector = createSelector(
  [searchParamsSelector],
  searchParams => +searchParams.page
);
