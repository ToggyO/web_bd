import { takeLatest, call, put } from 'redux-saga/effects';
import { message, Modal } from 'antd';
import { ROUTES } from '@config/constants';
import history from '@services/history';
import api from '@services/api';
import * as types from './types';
import { tradesTypes } from '../trades';

function* postTrade(action) {
  try {
    const { data } = yield call(api.trades.postTrade, action.payload);
    yield put({ type: types.POST_TRADE_SUCCESS, payload: data });
    yield call(history.push, {
      pathname: ROUTES.DASHBOARD.CREATED,
      state: { id: data.id },
    });
    yield call(message.success, 'Success! Trade has been created');
  } catch (error) {
    yield put({ type: types.POST_TRADE_ERROR, payload: error });
  }
}

export function* postTradeSaga() {
  yield takeLatest(types.POST_TRADE_REQUEST, postTrade);
}

function* getTradeById(action) {
  try {
    const { data } = yield call(api.trades.getTradeById, action.payload);
    yield put({ type: types.GET_TRADE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_TRADE_BY_ID_ERROR, payload: error });
    yield call(history.push, ROUTES.DASHBOARD.ROOT);
  }
}

export function* getTradeByIdSaga() {
  yield takeLatest(types.GET_TRADE_BY_ID_REQUEST, getTradeById);
}

function* editTrade(action) {
  try {
    const { data } = yield call(api.trades.editTrade, action.payload);
    yield put({ type: types.EDIT_TRADE_SUCCESS, payload: data });
    yield call(history.push, {
      pathname: ROUTES.DASHBOARD.CREATED,
      state: { id: data.id },
    });
    yield call(message.success, 'Success! Trade has been changed');
  } catch (error) {
    yield put({ type: types.EDIT_TRADE_ERROR, payload: error });
  }
}

export function* editTradeSaga() {
  yield takeLatest(types.EDIT_TRADE_REQUEST, editTrade);
}

function* deleteTrade(aciton) {
  try {
    const { data } = yield call(api.trades.deleteTrade, aciton.payload);
    yield put({ type: types.DELETE_TRADE_SUCCESS, payload: data });

    yield call(Modal.destroyAll);
    yield put({
      type: tradesTypes.GET_MY_CREATED_ADS_REQUEST,
      payload: 'created',
    });
  } catch (error) {
    yield put({ type: types.DELETE_TRADE_ERROR, payload: error });
  }
}

export function* deleteTradeSaga() {
  yield takeLatest(types.DELETE_TRADE_REQUEST, deleteTrade);
}

function* toggleTradeStatus(aciton) {
  try {
    const { data } = yield call(api.trades.toggleTradeStatus, aciton.payload);
    yield put({ type: types.TOGGLE_TRADE_STATUS_SUCCESS, payload: data });

    yield put({
      type: tradesTypes.GET_MY_CREATED_ADS_REQUEST,
      payload: 'created',
    });
    yield call(history.push, {
      state: { id: data.id },
    });
  } catch (error) {
    yield put({ type: types.TOGGLE_TRADE_STATUS_ERROR, payload: error });
  }
}

export function* toggleTradeStatusSaga() {
  yield takeLatest(types.TOGGLE_TRADE_STATUS_REQUEST, toggleTradeStatus);
}
