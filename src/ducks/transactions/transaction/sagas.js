import { takeLatest, put, call } from 'redux-saga/effects';
import api from '@services/api';
import history from '@services/history';
import { ROUTES } from '@config/constants';
import * as types from './types';

function* initiateTransaction(aciton) {
  try {
    const { data } = yield call(api.transactions.initiate, aciton.payload);
    yield put({ type: types.INITIATE_TRANSACTION_SUCCESS, payload: data });
    history.push(`${ROUTES.TRANSACTIONS.ROOT}/${data.id}`);
  } catch (error) {
    yield put({ type: types.INITIATE_TRANSACTION_ERROR, payload: error });
  }
}

export function* initiateTransactionSaga() {
  yield takeLatest(types.INITIATE_TRANSACTION_REQUEST, initiateTransaction);
}
