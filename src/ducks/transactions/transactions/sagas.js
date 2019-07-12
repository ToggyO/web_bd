import { put, call, takeLatest } from 'redux-saga/effects';
import api from '@services/api';
import * as transactionsTypes from './types';

function* getPendingTransactions(action) {
  try {
    const { data } = yield call(api.transactions.getTransactions, action.payload);
    yield put({ type: transactionsTypes.GET_PENDING_TRANSACTIONS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: transactionsTypes.GET_PENDING_TRANSACTIONS_ERROR, payload: error });
  }
}

export function* getPendingTransactionsSaga() {
  yield takeLatest(transactionsTypes.GET_PENDING_TRANSACTIONS_REQUEST, getPendingTransactions);
}
