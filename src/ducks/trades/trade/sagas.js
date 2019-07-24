import { takeLatest, put, call } from 'redux-saga/effects';
import api from '@services/api';
import history from '@services/history';
import { ROUTES } from '@config/constants';
import * as types from './types';

function* initiateTrade(action) {
  try {
    const { data } = yield call(api.trades.initiate, action.payload);
    yield put({ type: types.INITIATE_SUCCESS, payload: data });
    history.push(`${ROUTES.TRADES.ROOT}/${data.id}`);
  } catch (error) {
    yield put({ type: types.INITIATE_ERROR, payload: error });
  }
}

export function* initiateTradeSaga() {
  yield takeLatest(types.INITIATE_REQUEST, initiateTrade);
}

function* getTradeById(action) {
  try {
    const { data } = yield call(api.trades.getTradeById, action.payload);
    yield put({ type: types.GET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield call(history.push, ROUTES[404]);
    yield put({ type: types.GET_BY_ID_ERROR, payload: error });
  }
}

export function* getTradeByIdSaga() {
  yield takeLatest(types.GET_BY_ID_REQUEST, getTradeById);
}

function* confirmTrade(action) {
  try {
    const { data } = yield call(api.trades.confirm, action.payload);
    yield put({ type: types.CONFIRM_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.CONFIRM_ERROR, payload: error });
  }
}

export function* confirmTradeSaga() {
  yield takeLatest(types.CONFIRM_REQUEST, confirmTrade);
}
