import * as types from './types';

export const filterDataSubmit = filterFormValues => ({
  type: types.FILTER_DATA_SUBMIT,
  payload: filterFormValues,
});

export const tablePageChange = page => ({
  type: types.TABLE_PAGE_CHANGE,
  payload: page,
});

export const tableSort = fieldAndDirection => ({
  type: types.TABLE_SORT,
  payload: fieldAndDirection,
});

export const cleanState = () => ({
  type: types.CLEAN_STATE,
});
